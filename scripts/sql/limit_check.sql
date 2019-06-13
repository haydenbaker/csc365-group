drop trigger if exists limit_check;
delimiter $
create trigger limit_check before update on Card
for each row
	begin
		if new.Balance > new.Limit then
			signal sqlstate '69421';
		end if;
end$