CREATE DEFINER=`cgrave01`@`%` PROCEDURE `change_reservation`(in old_seat INT, in new_seat INT)
BEGIN
	DECLARE acc_id INTEGER DEFAULT NULL;
    DECLARE EXIT HANDLER FOR NOT FOUND SIGNAL SQLSTATE '45004' SET MESSAGE_TEXT = 'some value not found while attempting to modify reservation.';
    SELECT AccId INTO acc_id FROM Reservation WHERE Sid = old_seat;
    
    START TRANSACTION;
    CALL cancel_reservation(old_seat);
     IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    CALL reserve_seat(new_seat, acc_id);
     IF row_count() != 1 THEN
		ROLLBACK;
	END IF;
    COMMIT;
END