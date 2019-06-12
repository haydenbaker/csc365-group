package resource;

import dao.DaoManager;
import model.Reservation;
import model.Seat;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class SeatController {

    private DaoManager manager = new DaoManager();
    private final String EXTERNAL = "http://localhost:3000";

    @CrossOrigin(origins = EXTERNAL)
    @GetMapping("/seat")
    @ResponseBody
    public List<Seat> getSeats(@RequestParam(value="date", required=false) String date,
                               @RequestParam(value="class", required=false) String sClass,
                               @RequestParam(value="location", required=false) String sLocation,
                               @RequestParam(value="source", required=false) String source,
                               @RequestParam(value="destination", required=false) String dest){

        return manager.getSeatDao().searchSeats(date, sClass, sLocation, source, dest);
    }

    @CrossOrigin(origins = EXTERNAL)
    @PutMapping("/seat/reserve/{seatId}/{accountId}")
    public Reservation reserveSeat(@PathVariable int seatId, @PathVariable int accountId){
        manager.getSeatDao().reserveSeat(seatId, accountId);
        return manager.getReservationDao().getReservationBySeatId(seatId);
    }
}
