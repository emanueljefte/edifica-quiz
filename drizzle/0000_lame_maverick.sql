CREATE TABLE `lessons` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` integer,
	`text` text NOT NULL,
	`is_correct` text NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lesson_id` integer,
	`question_text` text NOT NULL,
	`bible_verse` text,
	`explanation` text,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `talent_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`reason` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`user_id` integer,
	`lesson_id` integer,
	`status` text DEFAULT 'completed',
	`accuracy` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`current_level` text DEFAULT 'Pescador',
	`experience` integer DEFAULT 0,
	`talents` integer DEFAULT 0
);
