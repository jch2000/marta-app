CREATE DATABASE martaplus;

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
CREATE TABLE customer (
  customer_id smallint unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  phone varchar(10) DEFAULT NULL,
  username varchar(20) DEFAULT NULL,
  userpassword varchar(20) DEFAULT NULL,
  PRIMARY KEY (customer_id)
);
CREATE TABLE martapass (
  ticket_id smallint unsigned NOT NULL,
  num_days smallint unsigned DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  FOREIGN KEY (ticket_id) REFERENCES ticket (ticket_id)
);
CREATE TABLE ticket (
  customer_id smallint unsigned DEFAULT NULL,
  ticket_id smallint unsigned NOT NULL,
  issued date DEFAULT NULL,
  expiration date DEFAULT NULL,
  PRIMARY KEY (ticket_id),
  KEY customer_id (customer_id),
  FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);