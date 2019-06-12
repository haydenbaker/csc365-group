package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;

public class DaoManager {

    private final String DBURL = "jdbc:mysql://csc365.toshikuboi.net/sec03group08";
    private final String USER = "tbbergma";
    private final String PASS = "012360110";
    private final String GROUPUSER = "sec03group08";
    private final String GROUPPASS = "group08@sec03";

    private DriverManager driverManager= null;
    private Connection conn = null;

    private SeatDao seatDao = new SeatDao(conn);
    private ReservationDao reservationDao = new ReservationDao(conn);

    public SeatDao getSeatDao(){
        seatDao.setConn(getConnection());
        return seatDao;
    }

    public ReservationDao getReservationDao() {
        reservationDao.setConn(getConnection());
        return reservationDao;
    }

    private Connection getConnection(){
        try {
            if(conn == null || conn.isClosed()) {
                conn = DriverManager.getConnection(DBURL, GROUPUSER, GROUPPASS);
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            System.out.println(Level.WARNING + ": " + se.toString());
        } catch (Exception e) {
            //Handle errors for Class.forName
            System.out.println(Level.WARNING + ": " + e.toString());
        }
        return conn;
    }
}
