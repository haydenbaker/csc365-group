package dao;

import model.Reservation;
import model.Revenue;

import java.sql.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ReservationDao extends Dao{

    public ReservationDao(Connection conn){
        super(conn);
    }

    public Reservation getReservationBySeatId(int seatId){
        ArrayList<Reservation> reservation = new ArrayList<>();
        try {
            pstmt = conn.prepareStatement(
                    "SELECT FlightNo, SourceAirport, DestAirport, " +
                            "FlightDate, Sid, Class, Location " +
                            "FROM Flight f " +
                            "JOIN (" +
                                "SELECT Sid, Fid, CLass, Location " +
                                "FROM Seat WHERE Sid = ?" +
                            ")s on f.Fid = s.Fid"
            );
            pstmt.setInt(1, seatId);
            rs = pstmt.executeQuery();
            getReservationsFromResultSet(reservation, rs);
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, pstmt, rs);
        }
        return reservation.get(0);
    }

    public List<Reservation> getReservationByAccountId(int accountId){
        ArrayList<Reservation> reservations = new ArrayList<>();
        try{
            pstmt = conn.prepareStatement(
                    "SELECT FlightNo, SourceAirport, DestAirport, " +
                            "FlightDate, Sid, Class, Location " +
                            "FROM Flight f " +
                            "JOIN (" +
                                "SELECT Sid, Fid, CLass, Location " +
                                "FROM Seat WHERE Sid in (" +
                                        "SELECT Sid FROM Reservation WHERE AccId = ?" +
                                    ")" +
                            ")s on f.Fid = s.Fid"
            );
            pstmt.setInt(1, accountId);
            rs = pstmt.executeQuery();
            getReservationsFromResultSet(reservations, rs);
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, pstmt, rs);
        }
        return reservations;
    }

    public boolean changeReservation(int oldSeatId, int newSeatId){
        boolean exitStatus = false;
        try {
            cstmt = conn.prepareCall("{call change_reservation(?,?)}");
            cstmt.setInt(1, oldSeatId);
            cstmt.setInt(2, newSeatId);
            cstmt.execute();
            exitStatus = true;
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, cstmt, rs);
        }
        return exitStatus;
    }

    public boolean cancelReservation(int seatId){
        boolean exitStatus = false;
        try {
            cstmt = conn.prepareCall("{call cancel_reservation(?)}");
            cstmt.setInt(1, seatId);
            cstmt.execute();
            exitStatus = true;
        }catch(Exception exc){
            exc.printStackTrace();
        }finally{
            super.close(conn, cstmt, rs);
        }
        return exitStatus;
    }

    public List<Revenue> getTotalRevenue(String airline){
       ArrayList<Revenue> yearlyRevenue = new ArrayList<>();

        try {
            cstmt = conn.prepareCall("{call rollup_revenue}");
            cstmt.execute();
            rs = cstmt.getResultSet();
            getRevsFromResultSet(yearlyRevenue, airline, rs);
        } catch(Exception se) {
            se.printStackTrace();
        } finally{
            super.close(conn, cstmt, rs);
        }
        return yearlyRevenue;

    }

    private void getRevsFromResultSet(ArrayList<Revenue> yearlyRevenue, String airline, ResultSet rs) throws SQLException {
        while(rs.next()){
            String airlineName = rs.getString("Airline");
            if(airlineName.equals(airline)){
                String[] months = new String[12];
                for(int i=3; i<15; i++){
                    months[i-3] = rs.getString(i);
                }
                Revenue revenue = new Revenue(
                        airline,
                        rs.getString("Year"),
                        months,
                        rs.getString("Total")
                );
                yearlyRevenue.add(revenue);
            }
        }
    }

    private void getReservationsFromResultSet(ArrayList<Reservation> reservations, ResultSet rs) throws SQLException {
        while(rs.next()){

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            Reservation reservation = new Reservation(
                    rs.getInt("FlightNo"),
                    rs.getString("SourceAirport"),
                    rs.getString("DestAirport"),
                    rs.getTimestamp("FlightDate").toLocalDateTime().format(formatter),
                    rs.getInt("Sid"),
                    rs.getString("Class"),
                    rs.getString("Location")
            );
            reservations.add(reservation);
        }
    }
}
