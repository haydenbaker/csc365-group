CREATE DEFINER=`cgrave01`@`%` PROCEDURE `reserve_seat`(in seat_id INTEGER, in acc_id INTEGER)
BEGIN
    DECLARE isTaken Integer DEFAULT NULL;
    DECLARE price INTEGER DEFAULT NULL;
    DECLARE credit_card INTEGER DEFAULT NULL;
    DECLARE f_date DATETIME DEFAULT "1970-01-01 00:00:00";
    DECLARE EXIT HANDLER FOR NOT FOUND SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'some value not found while attempting to reserve flight.';
    
    SELECT Taken INTO isTaken FROM Seat WHERE Sid = seat_id;
    IF isTaken != 0 THEN
		SIGNAL SQLSTATE '45001'
		SET MESSAGE_TEXT = 'Seat has already been reserved.';
	END IF;
    
	SELECT FlightDate INTO f_date FROM Seat, Flight WHERE Seat.Sid = seat_id and Seat.Fid = Flight.Fid;
	IF TIMEDIFF(f_date, NOW()) < "02:00:00" THEN
		SIGNAL SQLSTATE '45008'
		SET MESSAGE_TEXT = 'Flight departs in less than 2 hours or is already departed.';
	END IF;

    SELECT Cost INTO price FROM Seat WHERE Sid = seat_id;
    SELECT Cid INTO credit_card FROM Account WHERE AccId = acc_id;

    START TRANSACTION;
    UPDATE Card SET Balance = Balance + price WHERE Cid = credit_card;
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    
    UPDATE Seat SET Taken = 1 WHERE Sid = seat_id;
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    
    INSERT INTO Reservation(Rdate, Sid, AccId) VALUES(NOW(), seat_id, acc_id);
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    COMMIT;
END