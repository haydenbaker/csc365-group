CREATE DEFINER=`cgrave01`@`%` PROCEDURE `cancel_reservation`(in seat_id INTEGER)
BEGIN
    DECLARE isTaken Integer DEFAULT NULL;
    DECLARE price INTEGER DEFAULT NULL;
    DECLARE credit_card INTEGER DEFAULT NULL;
    DECLARE acc_id INTEGER DEFAULT NULL;
    DECLARE EXIT HANDLER FOR NOT FOUND SIGNAL SQLSTATE '45003' SET MESSAGE_TEXT = 'some value not found while attempting to cancel reservation.';
    
    SELECT Taken INTO isTaken FROM Seat WHERE Sid = seat_id;
    IF isTaken != 1 THEN
		SIGNAL SQLSTATE '45002'
		SET MESSAGE_TEXT = 'Seat is not already reserved.';
	END IF;
    
    SELECT Cost INTO price FROM Seat WHERE Sid = seat_id;
    SELECT AccId INTO acc_id FROM Reservation WHERE Sid = seat_id;
    SELECT Cid INTO credit_card FROM Account WHERE AccId = acc_id;

    START TRANSACTION;
    UPDATE Card SET Balance = Balance - price WHERE Cid = credit_card;
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    
    UPDATE Seat SET Taken = 0 WHERE Sid = seat_id;
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    
    DELETE FROM Reservation WHERE Sid = seat_id and AccId = acc_id;
    IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    COMMIT;
END