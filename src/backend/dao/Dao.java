package dao;

import java.sql.*;
import java.util.logging.Level;

public class Dao {
    protected Connection conn = null;
    protected PreparedStatement pstmt = null;
    protected CallableStatement cstmt = null;
    protected ResultSet rs = null;

    public Dao(Connection conn){
        this.conn = conn;
    }

    public void setConn(Connection conn) {
        this.conn = conn;
    }

    protected void close(Connection conn, Statement stmt, ResultSet rs){
        if(conn != null){
            try{
                conn.close();
            }catch(SQLException se){
                //Handle errors for JDBC
                System.out.println(Level.WARNING + ": " + se.toString());
            }
        }
        if(pstmt != null){
            try{
                pstmt.close();
            }catch(SQLException se){
                //Handle errors for JDBC
                System.out.println(Level.WARNING + ": " + se.toString());
            }
        }
        if(cstmt != null){
            try{
                cstmt.close();
            }catch(SQLException se){
                //Handle errors for JDBC
                System.out.println(Level.WARNING + ": " + se.toString());
            }
        }
        if(rs != null){
            try{
                rs.close();
            }catch(SQLException se){
                //Handle errors for JDBC
                System.out.println(Level.WARNING + ": " + se.toString());
            }
        }
    }
}
