PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ai_conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text,
	`model_used` text DEFAULT 'gpt-3.5-turbo',
	`total_messages` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ai_conversations`("id", "user_id", "title", "model_used", "total_messages", "created_at", "updated_at") SELECT "id", "user_id", "title", "model_used", "total_messages", "created_at", "updated_at" FROM `ai_conversations`;--> statement-breakpoint
DROP TABLE `ai_conversations`;--> statement-breakpoint
ALTER TABLE `__new_ai_conversations` RENAME TO `ai_conversations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;