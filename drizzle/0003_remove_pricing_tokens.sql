-- Remove pricing and token-related columns
PRAGMA foreign_keys=OFF;

-- Update users table to remove subscription_tier
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text,
	`full_name` text,
	`avatar_url` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	`last_login` integer,
	`is_active` integer DEFAULT true
);

INSERT INTO `__new_users`("id", "email", "username", "full_name", "avatar_url", "created_at", "updated_at", "last_login", "is_active") 
SELECT "id", "email", "username", "full_name", "avatar_url", "created_at", "updated_at", "last_login", "is_active" FROM `users`;

DROP TABLE `users`;
ALTER TABLE `__new_users` RENAME TO `users`;

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);

-- Update ai_messages table to remove tokens_used
CREATE TABLE `__new_ai_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`response_time` integer,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`conversation_id`) REFERENCES `ai_conversations`(`id`) ON UPDATE no action ON DELETE cascade
);

INSERT INTO `__new_ai_messages`("id", "conversation_id", "role", "content", "response_time", "created_at")
SELECT "id", "conversation_id", "role", "content", "response_time", "created_at" FROM `ai_messages`;

DROP TABLE `ai_messages`;
ALTER TABLE `__new_ai_messages` RENAME TO `ai_messages`;

-- Drop ai_usage table completely as it's no longer needed
DROP TABLE `ai_usage`;

PRAGMA foreign_keys=ON;