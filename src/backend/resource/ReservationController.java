package resource;

import dao.DaoManager;
import model.Reservation;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReservationController {

    private DaoManager manager = new DaoManager();
    private final String EXTERNAL = "http://localhost:3000";

    @CrossOrigin(origins = EXTERNAL)
    @GetMapping("/reservation/{accountId}")
    public List<Reservation> getReservationsFromAccount(@PathVariable int accountId){
        return manager.getReservationDao().getReservationByAccountId(accountId);
    };

    @CrossOrigin(origins = EXTERNAL)
    @PutMapping("/reservation/change/{oldSeatId}/{newSeatId}")
    public List<Reservation> changeReservation(@PathVariable int oldSeatId, @PathVariable int newSeatId){
        ArrayList<Reservation> changed = new ArrayList<>();
        manager.getReservationDao().changeReservation(oldSeatId, newSeatId);
        changed.add(manager.getReservationDao().getReservationBySeatId(oldSeatId));
        changed.add(manager.getReservationDao().getReservationBySeatId(newSeatId));
        return changed;
    }

    @CrossOrigin(origins = EXTERNAL)
    @PutMapping("/reservation/cancel/{seatId}")
    public Reservation cancelReservation(@PathVariable int seatId){
        manager.getReservationDao().cancelReservation(seatId);
        return manager.getReservationDao().getReservationBySeatId(seatId);
    }
}
