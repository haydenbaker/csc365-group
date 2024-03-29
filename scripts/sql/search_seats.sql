drop procedure if exists search_seats;
delimiter $ 
create procedure search_seats(in Fday datetime, Class enum('FIRST', 'BUSINESS', 'ECONOMY'), Location enum('WINDOW', 'MIDDLE', 'AISLE'), Src varchar(50), Dest varchar(50))
begin
	select * from Flight f join Seat s using (fid) where
		s.taken = 0 and
		(Fday is NULL or date(f.FlightDate) = Fday) and
        (Class is NULL or s.Class = Class) and
        (Location is NULL or s.Location = Location) and
        (Src is NULL or f.SourceAirport = Src) and
        (Dest is NULL or f.DestAirport = Dest);
end $
delimiter ;