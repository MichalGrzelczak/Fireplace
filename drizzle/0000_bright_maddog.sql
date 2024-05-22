CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`context` text,
	`user_id` text NOT NULL,
	`read` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `participation_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`request_date` integer NOT NULL,
	`request_user_message` text,
	`request_user_role` text,
	`resolution` text,
	`resolver` text,
	`resolution_date` integer
);
