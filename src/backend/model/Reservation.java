package model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Reservation {

    private int flightNo;
    private String sourceAirport;
    private String destAirport;
    private String flightDate;

    private int seatId;
    private String seatClass;
    private String seatLocation;

    public Reservation(int flightNo, String sourceAirport, String destAirport, String flightDate,
                       int seatId, String seatClass, String seatLocation){
        this.flightNo = flightNo;
        this.sourceAirport = sourceAirport;
        this.destAirport = destAirport;
        this.flightDate = flightDate;
        this.seatId = seatId;
        this.seatClass = seatClass;
        this.seatLocation = seatLocation;
    }

    public int getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(int flightNo) {
        this.flightNo = flightNo;
    }

    public String getSourceAirport() {
        return sourceAirport;
    }

    public void setSourceAirport(String sourceAirport) {
        this.sourceAirport = sourceAirport;
    }

    public String getDestAirport() {
        return destAirport;
    }

    public void setDestAirport(String destAirport) {
        this.destAirport = destAirport;
    }

    public String getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(String flightDate) {
        this.flightDate = flightDate;
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

    @Override
    public String toString() {
        return "Reservation{" +
                "flightNo=" + flightNo +
                ", sourceAirport='" + sourceAirport + '\'' +
                ", destAirport='" + destAirport + '\'' +
                ", flightDate=" + flightDate +
                ", seatId=" + seatId +
                ", seatClass='" + seatClass + '\'' +
                ", seatLocation='" + seatLocation + '\'' +
                '}';
    }
}
