CREATE TABLE customer (
  customer_id smallint unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  email varchar(45) UNIQUE NOT NULL,
  phone varchar(10) DEFAULT NULL,
  username varchar(20) UNIQUE DEFAULT NULL,
  userpassword varchar(20) DEFAULT NULL,
  PRIMARY KEY (customer_id)
);

CREATE TABLE ticket (
  customer_id smallint unsigned DEFAULT NULL,
  ticket_id smallint unsigned NOT NULL,
  issued date DEFAULT NULL,
  expiration date DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

CREATE TABLE breezecard (
  ticket_id smallint unsigned NOT NULL,
  balance decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);

CREATE TABLE breezeticket (
  ticket_id smallint unsigned NOT NULL,
  num_rides smallint unsigned DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);

CREATE TABLE martapass (
  ticket_id smallint unsigned NOT NULL,
  num_days smallint unsigned DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);

CREATE TABLE Station (
	  station_name VARCHAR(30),
    latitude DOUBLE,
    longitude DOUBLE,
    PRIMARY KEY(station_name)
);

CREATE TABLE Line (
    id smallint unsigned auto_increment,
    color VARCHAR(5),
    direction CHAR(1),
    PRIMARY KEY(id)
);

CREATE TABLE Route (
	  id smallint unsigned AUTO_INCREMENT,
	  color VARCHAR(5),
    direction CHAR(1),
	  st_1 VARCHAR(30),
    st_2 VARCHAR(30),
    st_3 VARCHAR(30),
    st_4 VARCHAR(30),
    st_5 VARCHAR(30),
    st_6 VARCHAR(30),
    st_7 VARCHAR(30),
    st_8 VARCHAR(30),
    st_9 VARCHAR(30),
    st_10 VARCHAR(30),
    st_11 VARCHAR(30),
    st_12 VARCHAR(30),
	  st_13 VARCHAR(30),
    st_14 VARCHAR(30),
    st_15 VARCHAR(30),
    PRIMARY KEY (id),
--     FOREIGN KEY(color) references Line(color),
--     FOREIGN KEY(direction) references Line(direction),
    FOREIGN KEY(st_1) references Station(station_name),
    FOREIGN KEY(st_2) references Station(station_name),
    FOREIGN KEY(st_3) references Station(station_name),
    FOREIGN KEY(st_4) references Station(station_name),
    FOREIGN KEY(st_5) references Station(station_name),
    FOREIGN KEY(st_6) references Station(station_name),
    FOREIGN KEY(st_7) references Station(station_name),
    FOREIGN KEY(st_8) references Station(station_name),
    FOREIGN KEY(st_9) references Station(station_name),
    FOREIGN KEY(st_10) references Station(station_name),
    FOREIGN KEY(st_11) references Station(station_name),
    FOREIGN KEY(st_12) references Station(station_name),
	  FOREIGN KEY(st_13) references Station(station_name),
    FOREIGN KEY(st_14) references Station(station_name),
    FOREIGN KEY(st_15) references Station(station_name)
);

CREATE TABLE TrainSchedule (
	  id smallint unsigned auto_increment,
	  color VARCHAR(5) NOT NULL,
    direction CHAR(1) NOT NULL,
    st_1 TIME,
    st_2 TIME,
    st_3 TIME,
    st_4 TIME,
    st_5 TIME,
    st_6 TIME,
    st_7 TIME,
    st_8 TIME,
    st_9 TIME,
    st_10 TIME,
    st_11 TIME,
    st_12 TIME,
	  st_13 TIME,
    st_14 TIME,
    st_15 TIME,
    PRIMARY KEY(id)
--     FOREIGN KEY(color) references Line(color),
--     FOREIGN KEY(direction) references Line(direction)
);
