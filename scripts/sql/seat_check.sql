drop trigger if exists seat_check;
delimiter $
create trigger seat_check before update on Seat	
for each row 
    begin
		if old.Taken = 1 and new.Taken = 1 then
			signal sqlstate '69420';
		end if;
end $
delimiter ;