import com.sun.source.tree.Tree;

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
	        //getAllFlights(stmt);
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
    	ArrayList<Integer> ids;
    	if (input == 1) {
    		ids = getIds("Student");
    		login(scan, "customer", ids);
    		printCustomerOptions(scan);
    	}
    	else if (input== 2) {
    		ids = getIds("Manager");
    		login(scan, "manager", ids);
    		printRevenueTable(scan);
    	}
    	else
    		System.exit(0);
    }
    
    public static ArrayList<Integer> getIds(String table) {
    	ArrayList<Integer> ids = new ArrayList<Integer>();
    	ids.add(1);
    	ids.add(2);
    	ids.add(3);
    	return ids;
    }
    
    public static void login(Scanner scan, String type, ArrayList<Integer> ids) {
    	String prompt = "Enter your " + type + "ID: ";
    	String input;
    	do {
    		System.out.print(prompt);
    		input = scan.nextLine();
    		if(input.matches("-?\\d+(\\.\\d+)?")) {
    			int id = Integer.parseInt(input);
    			if(true/*if the correct ID*/) {
    				return;
    			}
    		}
    		System.out.println("\nIncorrect ID, please enter your customer id below:\n");
    		System.out.println(prompt);
    	}
    	while(input != null);
    }
    
    public static void printCustomerOptions(Scanner scan) {
    	String options = "1. Reserve a flight\n2. Cancel a reservation\n3. Change a reservation\n4. Back\n5. Exit";
    	System.out.println(options);
    	int input = takeInput(scan, 4, options);
    	
    	if (input == 1)
    		System.out.println("Reserve a flight");
    	else if (input== 2)
    		System.out.println("Cancel a reservation");
    	else if (input == 3)
    		System.out.println("Change a reservation");
    	else
    		System.exit(0);
    }
    
    public static void printRevenueTable(Scanner scan) {
    	
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
    	String sql = "select distinct a.Airline, f.FlightNo, f.SourceAirport, f.DestAirport, f.FlightDate from Flight f left join Seat s using (fid) join Airline a using (Aid) where s.Taken = 0 and f.FlightDate > now() + interval 2 Hour order by a.Airline, f.FlightDate";
        ResultSet rs = stmt.executeQuery(sql);
        while(rs.next()) {
        	System.out.println(rs.getString("Airline") + " " + rs.getInt("FlightNo") + " " +
        			rs.getString("SourceAirport") + " " + rs.getString("DestAirport") + " " 
        			+ rs.getString("FlightDate"));
        }
    }
}
