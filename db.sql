create database `mtiba_db`;

use `mtiba_db`;

create table `account_type`(
`_id` int(1) not null primary key auto_increment,
`name` varchar(100) not null
);

-- Create account type for different possible ones
insert into `account_type` (`name`) values ('doctor');
insert into `account_type` (`name`) values ('patient');


create table `users`(
`_id` int(9) not null primary key auto_increment,
`username` varchar(255) not null,
`password` varchar(255) not null,
`account_type` int(1) not null,
foreign key (`account_type`) references `account_type`(`_id`) on update cascade on delete cascade
);

create table `countries`(
	`_id` int(2) not null primary key auto_increment,
	`name` varchar(255) not null
);

-- Table for storing and validating API sessions
create table `user_sessions`(
`_id` int(9) not null primary key auto_increment,
`user_id` int(9) not null,
`session_token` varchar(255) not null,
foreign key (`user_id`) references `users`(`_id`) on update cascade on delete cascade
);

create table `patients_personal`(
	`_id` int(9) not null primary key auto_increment,
	`fullname` varchar(255) not null,
	`user_id` int(9) not null,
	`day_of_birth` int(1) not null,
	`month_of_birth` int(1) not null,
	`year_of_birth` int(4) not null,
	`is_in_care` boolean not null,
	`current_doctor` int(9) not null,
foreign key (`user_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`current_doctor`) references `users`(`_id`) on update cascade on delete cascade
);


create table `allergies`(
`_id` int(2) not null primary key auto_increment,
`name` varchar(255) not null
);

create table `patients_allegies`(
`_id` int(9) not null primary key auto_increment,
`allergy` int(2) not null,
`user_id` int(9) not null,
foreign key (`user_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`allergy`) references `allergies`(`_id`) on update cascade on delete cascade
);


create table `medical_conditions`(
`_id` int(2) not null primary key auto_increment,
`name` varchar(255) not null
);


create table `patients_medical_conditions`(
`_id` int(9) not null primary key auto_increment,
`medical_conditions` int(2) not null,
`user_id` int(9) not null,
foreign key (`user_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`medical_conditions`) references `medical_conditions`(`_id`) on update cascade on delete cascade
);

create table `doctors_personal`(
	`_id` int(9) not null primary key auto_increment,
	`fullname` varchar(255) not null,
	`user_id` int(9) not null,
	foreign key (`user_id`) references `users`(`_id`) on update cascade on delete cascade
);

create table `patients_medical_records`(
`_id` int(9) not null primary key auto_increment,
`doctor_id` int(9) not null,
`patient_id` int(9) not null,
`summary` varchar(255) not null,
`description` text not null,
foreign key (`doctor_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`patient_id`) references `users`(`_id`) on update cascade on delete cascade
);

-- patients - doctors matching

create table `patients_doctors_match`(
`_id` int(9) not null primary key auto_increment,
`patient_id` int(9) not null,
`doctor_id` int(9) not null,
foreign key (`patient_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`doctor_id`) references `users`(`_id`) on update cascade on delete cascade
);

-- Chat schema

create table `conversations`(
	`_id` int(9) not null primary key auto_increment,
	`doctor_id` int(9) not null,
	`patient_id` int(9) not null,
	`conversation_title` varchar(255) null,
	foreign key (`patient_id`) references `users`(`_id`) on update cascade on delete cascade,
	foreign key (`doctor_id`) references `users`(`_id`) on update cascade on delete cascade
);

create table `messages`(
`_id` int(9) not null primary key auto_increment,
`sender_id` int(9) not null,
`message_content` text not null,
`message_attachment` varchar(255) null,
`message_timestamp` datetime not null default CURRENT_TIMESTAMP,
`message_status` int(1) not null default 1,
`conversation` int(9) not null,
foreign key (`sender_id`) references `users`(`_id`) on update cascade on delete cascade,
foreign key (`conversation`) references `conversations`(`_id`) on update cascade on delete cascade
);
