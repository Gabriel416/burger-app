CREATE DATABASE task_db;

USE task_db;

CREATE TABLE tasks(
	id integer auto_increment not null primary key,
	task_name varchar(30) not null,
	done boolean default false,
	date TIMESTAMP
);