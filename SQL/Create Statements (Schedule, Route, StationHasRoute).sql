CREATE TABLE Route (
	line_id smallint unsigned,
	st_1 VARCHAR(50),
    st_2 VARCHAR(50),
    st_3 VARCHAR(50),
    st_4 VARCHAR(50),
    st_5 VARCHAR(50),
    st_6 VARCHAR(50),
    st_7 VARCHAR(50),
    st_8 VARCHAR(50),
    st_9 VARCHAR(50),
    st_10 VARCHAR(50),
    st_11 VARCHAR(50),
    st_12 VARCHAR(50),
	st_13 VARCHAR(50),
    st_14 VARCHAR(50),
    st_15 VARCHAR(50),
    st_16 VARCHAR(50),
    st_17 VARCHAR(50),
    st_18 VARCHAR(50),
    st_19 VARCHAR(50),
    PRIMARY KEY (line_id),
	FOREIGN KEY(line_id) references Line(id),
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
    FOREIGN KEY(st_15) references Station(station_name),
    FOREIGN KEY(st_16) references Station(station_name),
    FOREIGN KEY(st_17) references Station(station_name),
	FOREIGN KEY(st_18) references Station(station_name),
    FOREIGN KEY(st_19) references Station(station_name)
);

CREATE TABLE TrainSchedule (
	id smallint unsigned auto_increment,
	line_id smallint unsigned,
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
    st_16 TIME,
    st_17 TIME,
    st_18 TIME,
    st_19 TIME,
    PRIMARY KEY(id),
    FOREIGN KEY(line_id) references Line(id)
);

CREATE TABLE StationHasRoute (
	station_name VARCHAR(50),
    line_id smallint unsigned,
    position VARCHAR(5),
    PRIMARY KEY(station_name, line_id),
    Foreign Key(station_name) references Station(station_name),
    Foreign Key(line_id) references Line(id)
);