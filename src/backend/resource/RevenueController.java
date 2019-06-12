package resource;

import dao.DaoManager;
import model.Revenue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RevenueController {

    private DaoManager manager = new DaoManager();
    private final String EXTERNAL = "http://localhost:3000";

    @CrossOrigin(origins = EXTERNAL)
    @GetMapping("/revenue/{airline}")
    public List<Revenue> getRevenue(@PathVariable String airline){
        return manager.getReservationDao().getTotalRevenue(airline);
    }
}
