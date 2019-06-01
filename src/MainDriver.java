import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.logging.*;

public class MainDriver {

	private final static String DBUrl = "jdbc:mysql://csc365.toshikuboi.net/sec03group08";
	
	private final static String myUser = "tbbergma";
	private final static String myPass = "012360110";
	
	private final static String groupUser = "sec03group08";
	private final static String groupPass = "group08@sec03";
	
	private static Statement stmt;
	
    public static void main(String args[]) throws ClassNotFoundException {
    	Connection conn = null;
    	Scanner scan = new Scanner(System.in);  // Create a Scanner object
    	try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        conn = DriverManager.getConnection(DBUrl, groupUser, groupPass);
	        stmt = conn.createStatement();
            // calls go here
	        getAllFlights(stmt);
	        printHome(scan);
	        //printHome();
            stmt.close();
        } catch(SQLException se) {
            //Handle errors for JDBC
            System.out.println(Level.WARNING + ": " + se.toString());
        } catch(Exception e) {
            //Handle errors for Class.forName
            System.out.println(Level.WARNING + ": " + e.toString());
        }
        finally {
            if (conn != null) try { conn.close(); } catch (SQLException ignore) {}
        }
    }
    
    public static void printHome(Scanner scan) {
    	String options = "1. Login as customer\n2. Login as manager\n3. Exit";
    	System.out.println(options);
    	int input = takeInput(scan, 3, options);
    	if (input == 1)
    		System.out.println("Customer login chosen");
    	else if (input== 2)
    		System.out.println("Manager login chosen");
    	else
    		System.exit(0);
    }
    
    //max is the largest option available (ex: for home page max would be 3)
    public static int takeInput(Scanner scan, int max, String options) {
    	String input;
    	do {
    		System.out.print("\nEnter option: ");
    		input = scan.nextLine();
    		if(input.matches("-?\\d+(\\.\\d+)?")) {
    			int num = Integer.parseInt(input);
    			if(num > 0 && num <= max) {
    				return num;
    			}
    		}
    		System.out.println("\nBad input, please just enter a number from the options below:\n");
    		System.out.println(options);
    	}
    	while(input != null);
    	return -1;
    }
    
    public static void getAllFlights(Statement stmt) throws SQLException {
    	String sql = "SELECT * FROM Flight";
        ResultSet rs = stmt.executeQuery(sql);
        while(rs.next()) {
        	System.out.println(rs.getInt("Airline") + " " + rs.getInt("FlightNo") + " " + 
        			rs.getString("SourceAirport") + " " + rs.getString("DestAirport") + " " 
        			+ rs.getString("FlightDate"));
        }
    }
}
