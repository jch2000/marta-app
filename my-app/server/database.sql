CREATE TABLE `customer` (
  `customer_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `userpassword` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Line` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `color` varchar(5) DEFAULT NULL,
  `direction` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Route` (
  `line_id` smallint unsigned NOT NULL,
  `st_1` varchar(50) DEFAULT NULL,
  `st_2` varchar(50) DEFAULT NULL,
  `st_3` varchar(50) DEFAULT NULL,
  `st_4` varchar(50) DEFAULT NULL,
  `st_5` varchar(50) DEFAULT NULL,
  `st_6` varchar(50) DEFAULT NULL,
  `st_7` varchar(50) DEFAULT NULL,
  `st_8` varchar(50) DEFAULT NULL,
  `st_9` varchar(50) DEFAULT NULL,
  `st_10` varchar(50) DEFAULT NULL,
  `st_11` varchar(50) DEFAULT NULL,
  `st_12` varchar(50) DEFAULT NULL,
  `st_13` varchar(50) DEFAULT NULL,
  `st_14` varchar(50) DEFAULT NULL,
  `st_15` varchar(50) DEFAULT NULL,
  `st_16` varchar(50) DEFAULT NULL,
  `st_17` varchar(50) DEFAULT NULL,
  `st_18` varchar(50) DEFAULT NULL,
  `st_19` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  KEY `st_1` (`st_1`),
  KEY `st_2` (`st_2`),
  KEY `st_3` (`st_3`),
  KEY `st_4` (`st_4`),
  KEY `st_5` (`st_5`),
  KEY `st_6` (`st_6`),
  KEY `st_7` (`st_7`),
  KEY `st_8` (`st_8`),
  KEY `st_9` (`st_9`),
  KEY `st_10` (`st_10`),
  KEY `st_11` (`st_11`),
  KEY `st_12` (`st_12`),
  KEY `st_13` (`st_13`),
  KEY `st_14` (`st_14`),
  KEY `st_15` (`st_15`),
  KEY `st_16` (`st_16`),
  KEY `st_17` (`st_17`),
  KEY `st_18` (`st_18`),
  KEY `st_19` (`st_19`),
  CONSTRAINT `Route_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `Line` (`id`),
  CONSTRAINT `Route_ibfk_10` FOREIGN KEY (`st_9`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_11` FOREIGN KEY (`st_10`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_12` FOREIGN KEY (`st_11`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_13` FOREIGN KEY (`st_12`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_14` FOREIGN KEY (`st_13`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_15` FOREIGN KEY (`st_14`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_16` FOREIGN KEY (`st_15`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_17` FOREIGN KEY (`st_16`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_18` FOREIGN KEY (`st_17`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_19` FOREIGN KEY (`st_18`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_2` FOREIGN KEY (`st_1`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_20` FOREIGN KEY (`st_19`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_3` FOREIGN KEY (`st_2`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_4` FOREIGN KEY (`st_3`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_5` FOREIGN KEY (`st_4`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_6` FOREIGN KEY (`st_5`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_7` FOREIGN KEY (`st_6`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_8` FOREIGN KEY (`st_7`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `Route_ibfk_9` FOREIGN KEY (`st_8`) REFERENCES `Station` (`station_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Station` (
  `station_name` varchar(50) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`station_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `StationHasRoute` (
  `station_name` varchar(50) NOT NULL,
  `line_id` smallint unsigned NOT NULL,
  `position` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`station_name`,`line_id`),
  KEY `line_id` (`line_id`),
  CONSTRAINT `StationHasRoute_ibfk_1` FOREIGN KEY (`station_name`) REFERENCES `Station` (`station_name`),
  CONSTRAINT `StationHasRoute_ibfk_2` FOREIGN KEY (`line_id`) REFERENCES `Line` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TrainSchedule` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `line_id` smallint unsigned DEFAULT NULL,
  `st_1` time DEFAULT NULL,
  `st_2` time DEFAULT NULL,
  `st_3` time DEFAULT NULL,
  `st_4` time DEFAULT NULL,
  `st_5` time DEFAULT NULL,
  `st_6` time DEFAULT NULL,
  `st_7` time DEFAULT NULL,
  `st_8` time DEFAULT NULL,
  `st_9` time DEFAULT NULL,
  `st_10` time DEFAULT NULL,
  `st_11` time DEFAULT NULL,
  `st_12` time DEFAULT NULL,
  `st_13` time DEFAULT NULL,
  `st_14` time DEFAULT NULL,
  `st_15` time DEFAULT NULL,
  `st_16` time DEFAULT NULL,
  `st_17` time DEFAULT NULL,
  `st_18` time DEFAULT NULL,
  `st_19` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `line_id` (`line_id`),
  CONSTRAINT `TrainSchedule_ibfk_1` FOREIGN KEY (`line_id`) REFERENCES `Line` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=548 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `ticket` (
  `customer_id` smallint unsigned DEFAULT NULL,
  `ticket_id` smallint unsigned NOT NULL,
  `issued` date DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `martapass` (
  `ticket_id` smallint unsigned NOT NULL,
  `num_days` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  CONSTRAINT `martapass_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `breezecard` (
  `ticket_id` smallint unsigned NOT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  CONSTRAINT `breezecard_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `breezeticket` (
  `ticket_id` smallint unsigned NOT NULL,
  `num_rides` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  CONSTRAINT `breezeticket_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;