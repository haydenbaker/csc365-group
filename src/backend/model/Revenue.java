package model;

import java.util.Arrays;

public class Revenue {

    private String airline;
    private String year;
    private String[] months;
    private String total;

    public Revenue(String airline, String year, String[] months, String total){
        this.airline = airline;
        this.year = year;
        this.months = months;
        this.total  = total;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String[] getMonths() {
        return months;
    }

    public void setMonths(String[] months) {
        this.months = months;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Revenue{" +
                "airline='" + airline + '\'' +
                ", year='" + year + '\'' +
                ", months=" + Arrays.toString(months) +
                '}';
    }
}
