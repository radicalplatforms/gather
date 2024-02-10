CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`desc` text,
	`price` real,
	`location` text NOT NULL,
	`image` text,
	`start_date` text,
	`end_date` text,
	`is_custom` integer,
	`created` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`authorUsername` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_to_group_events` (
	`authorUsername` integer NOT NULL,
	`event_id` integer NOT NULL,
	`group_id` integer NOT NULL,
	`vote` integer DEFAULT 1 NOT NULL,
	`start_date` text,
	PRIMARY KEY(`authorUsername`, `event_id`, `group_id`),
	FOREIGN KEY (`authorUsername`) REFERENCES `users`(`authorUsername`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action
);
