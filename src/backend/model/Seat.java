package model;

import java.util.Date;

public class Seat {

    private int flightNumber;
    private String sourceAirport;
    private String destinationAirport;
    private String flightDate;

    private int seatId;
    private String seatClass;
    private String seatLocation;
    private String cost;


    public Seat(int flightNumber, String sourceAirport, String destinationAirport, String flightDate,
                int seatId, String seatClass, String seatLocation, String cost){

        this.flightNumber = flightNumber;
        this.sourceAirport = sourceAirport;
        this.destinationAirport = destinationAirport;
        this.flightDate = flightDate;

        this.seatId = seatId;
        this.seatClass = seatClass;
        this.seatLocation = seatLocation;
        this.cost = cost;
     }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public String getSeatLocation() {
        return seatLocation;
    }

    public void setSeatLocation(String seatLocation) {
        this.seatLocation = seatLocation;
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public int getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(int flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getSourceAirport() {
        return sourceAirport;
    }

    public void setSourceAirport(String sourceAirport) {
        this.sourceAirport = sourceAirport;
    }

    public String getDestinationAirport() {
        return destinationAirport;
    }

    public void setDestinationAirport(String destinationAirport) {
        this.destinationAirport = destinationAirport;
    }

    public String getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(String flightDate) {
        this.flightDate = flightDate;
    }

    @Override
    public String toString() {
        return "Seat{" +
                "seatId=" + seatId +
                ", seatClass='" + seatClass + '\'' +
                ", seatLocation='" + seatLocation + '\'' +
                ", cost='" + cost + '\'' +
                ", flightNumber=" + flightNumber +
                ", sourceAirport='" + sourceAirport + '\'' +
                ", destinationAirport='" + destinationAirport + '\'' +
                ", flightDate=" + flightDate +
                '}';
    }

}
