CREATE TABLE customer (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

CREATE TABLE customer_npd (
  id            INT NOT NULL AUTO_INCREMENT,
  customer_id   INT NOT NULL,
  npd_id        INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customer (id),
  FOREIGN KEY (npd_id) REFERENCES non_productive_day (id)
);

CREATE TABLE non_productive_day (
  id            INT NOT NULL AUTO_INCREMENT,
  title         VARCHAR(1000),
  start         DATE,
  end           DATE,
  category      VARCHAR(1000),
  details       VARCHAR(10000),
  PRIMARY KEY (id)
);