CREATE TABLE `siteApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organization` varchar(180),
	`role` varchar(120),
	`message` text,
	`status` varchar(24) NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `siteApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `siteApplications_status_created_idx` ON `siteApplications` (`status`,`createdAt`);