CREATE DEFINER=`cgrave01`@`%` PROCEDURE `reserve_seat`(in seat_id INTEGER, in acc_id INTEGER)
BEGIN
    DECLARE isTaken Integer DEFAULT NULL;
    DECLARE price INTEGER DEFAULT NULL;
    DECLARE credit_card INTEGER DEFAULT NULL;
    
    SELECT Taken INTO isTaken FROM Seat WHERE Sid = seat_id;
    IF isTaken IS NULL THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Seat does not exist.';
	END IF;
    IF isTaken != 0 THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Seat has already been reserved.';
	END IF;
    
    SELECT Cost INTO price FROM Seat WHERE Sid = seat_id;
    IF price IS NULL THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Pricing Error.';
	END IF;
    
    SELECT Cid INTO credit_card FROM Account WHERE AccId = acc_id;
    IF credit_card IS NULL THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Credit card not found.';
	END IF;
    
    START TRANSACTION;
    SET AUTOCOMMIT = 0;
    UPDATE Card SET Balance = Balance + price WHERE Cid = credit_card;
    UPDATE Seat SET Taken = 1 WHERE Sid = seat_id;
    INSERT INTO Reservation(Rdate, Sid, AccId) VALUES(NOW(), seat_id, acc_id);
    COMMIT;
END