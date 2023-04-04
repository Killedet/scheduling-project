CREATE TABLE "users"(
	user_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(255) NOT NULL,
	phonenumber VARCHAR(20),
	seniority INT,
	password VARCHAR(255)
);

CREATE TABLE "role"(
	role_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	name VARCHAR(50)
);

CREATE TABLE "users_roles"(
	users_id REFERENCES users(user_id),
	roles_id REFERENCES roles(role_id)
);

CREATE TABLE "department_schedules"(
	department_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	department VARCHAR(50) NOT NULL
);

CREATE TABLE "user_schedules" (
	schedule_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	department_sched REFERENCES department_schedules(department_id),
	owner REFERENCES users(user_id)
);

CREATE TABLE "days"(
	day_id VARCHAR(50) PRIMARY KEY NOT NULL
);
CREATE TABLE "user_shifts"(
	shift_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	start_at TIME NOT NULL,
	end_at TIME NOT NULL,
	user_schedule_id REFERENCES user_schedules(schedule_id),
	day REFERENCES days(day_id)
);
CREATE TABLE "dates"(
	date_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	date DATE NOT NULL,
	day REFERENCES days(day_id)
);


CREATE TABLE "date_shifts"(
	d_shift_id INT PRIMARY KEY ALWAYS GENERATED AS IDENTITY NOT NULL,
	d_start_at TIME NOT NULL,
	d_end_at TIME NOT NULL,
	d_date_id REFERENCES dates(date_id),
	d_user_id REFERENCES users(user_id)
);

INSERT INTO days (day_id)
VALUES
	('Monday'),
	('Tuesday'),
	('Wednesday'),
	('Thursday'),
	('Friday'),
	('Saturday'),
	('Sunday');
