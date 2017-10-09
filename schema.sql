/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Drops the burgerK_db if it exists currently --
DROP DATABASE IF EXISTS burgers_db;

-- Create the database burgerK_db and specified it for use.
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table burgers.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger varchar(255) NOT NULL,
eaten BOOLEAN DEFAULT false,
PRIMARY KEY (id)
);

