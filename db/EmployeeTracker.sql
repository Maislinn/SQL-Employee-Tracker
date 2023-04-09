DROP DATABASE IF EXISTS EmployeeTracker;

CREATE DATABASE EmployeeTracker;

use EmployeeTracker;

CREATE TABLE `department`(
	`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `role`(
	`id` INT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INT NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `employee`(
	`id` INT AUTO_INCREMENT NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT NOT NULL,
    `manager_id` INT,
    PRIMARY KEY(`id`)
);



-- Departments
INSERT INTO `department`(`id`, `name`) VALUES(1, 'IT');
INSERT INTO `department`(`id`, `name`) VALUES(2, 'Finance');
INSERT INTO `department`(`id`, `name`) VALUES(3, 'Engineering');
INSERT INTO `department`(`id`, `name`) VALUES(4, 'Automotive');

-- Positions/roles
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(1, 'CTO', 8000, 1);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`)  VALUES(2, 'Web Developer', 5000, 1);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(3, 'System Analyst', 9000, 1);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(4, 'Financial Advisor', 5500, 2);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(5, 'Accountant', 4500, 2);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(6, 'Business Advisor', 7800, 2);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(7, 'Chief Engineer', 12000, 3);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(8, 'Electrical Engineer', 7800, 3);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(9, 'Mechanical Engineer', 6900, 3);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(10, 'Painter', 6000, 4);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(11, 'Car Electrician', 6000, 4);
INSERT INTO `role`(`id`, `title`, `salary`, `department_id`) VALUES(12, 'Tyre Expert', 4000, 4);

-- Employees
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(1, 'John', 'Doe', 1, null);
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(2, 'Jane', 'Doe', 6, null);
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(3, 'Rachael', 'Greene', 7, null);
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(4, 'Philip', 'Jones',2, 3);
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(5, 'Anna', 'Belle', 5, 2);
INSERT INTO `employee`(`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES(6, 'Mike', 'Rotch', 11, 1);