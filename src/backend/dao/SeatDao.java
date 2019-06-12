package dao;

import model.Seat;

import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class SeatDao extends Dao {

    public SeatDao(Connection conn){
        super(conn);
    }

    public List<Seat> searchSeats(String date, String seatClass, String seatLocation,
                                  String source, String destination){

        ArrayList<Seat> seats = new ArrayList<>();


        // check for null before doing the conversion

        Date mysqlDate = null;
        if(date != null){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate flightDate = LocalDate.parse(date, formatter);
            mysqlDate = java.sql.Date.valueOf(date);
        }

        try {
            cstmt = conn.prepareCall("{call search_seats(?, ?, ?, ?, ?)}");
            cstmt.setObject(1, mysqlDate, Types.DATE);
            cstmt.setObject(2, seatClass, Types.VARCHAR);
            cstmt.setObject(3, seatLocation, Types.VARCHAR);
            cstmt.setObject(4, source, Types.VARCHAR);
            cstmt.setObject(5, destination, Types.VARCHAR);
            cstmt.execute();
            rs = cstmt.getResultSet();
            getSeatsFromResultSet(seats, rs);
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, cstmt, rs);
        }
        return seats;
    }

    public boolean reserveSeat(int seatId, int accountId){
        boolean exitStatus = false;
        try {
            cstmt = conn.prepareCall("{call reserve_seat(?,?)}");
            cstmt.setInt(1, seatId);
            cstmt.setInt(2, accountId);
            cstmt.execute();
            exitStatus = true;
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, cstmt, rs);
        }
        return exitStatus;
    }

    private void getSeatsFromResultSet(ArrayList<Seat> seats, ResultSet rs) throws SQLException {
        while(rs.next()){

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            Seat seat = new Seat(
                rs.getInt("FlightNo"),
                rs.getString("SourceAirport"),
                rs.getString("DestAirport"),
                rs.getTimestamp("FlightDate").toLocalDateTime().format(formatter),
                rs.getInt("Sid"),
                rs.getString("Class"),
                rs.getString("Location"),
                rs.getString("Cost")
            );
            seats.add(seat);
        }
    }

}
