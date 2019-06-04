drop procedure if exists rollup_revenue;
delimiter $
create procedure rollup_revenue()
	begin
		select * from 
			(select mrev.a Airline, mrev.y Year, 
				sum(case when mrev.m = 1 then mrev.t end) January,
				sum(case when mrev.m = 2 then mrev.t end) February,
				sum(case when mrev.m = 3 then mrev.t end) March,
				sum(case when mrev.m = 4 then mrev.t end) April,
				sum(case when mrev.m = 5 then mrev.t end) May,
				sum(case when mrev.m = 6 then mrev.t end) June,
				sum(case when mrev.m = 7 then mrev.t end) July,
				sum(case when mrev.m = 8 then mrev.t end) August,
				sum(case when mrev.m = 9 then mrev.t end) September,
				sum(case when mrev.m = 10 then mrev.t end) Octover,
				sum(case when mrev.m = 11 then mrev.t end) November,
				sum(case when mrev.m = 12 then mrev.t end) December
			from (select Airline a, year(f.FlightDate) y, month(f.FlightDate) m, sum(s.cost) t 
				from Seat s join Flight f using (fid) join Airline a using (aid) 
                where s.taken = 1 
                group by 1, 2, 3) mrev 
			group by 1, 2) mrev join 
            (select mrev.a Airline, mrev.y Year, sum(mrev.t) Total
			from (select Airline a, year(f.FlightDate) y, month(f.FlightDate) m, sum(s.cost) t from Seat s join Flight f using (fid) join Airline a using (aid) where s.taken = 1 group by 1, 2, 3) mrev 
			group by 1, 2) trev using (Airline, Year);
	end$
delimiter ;