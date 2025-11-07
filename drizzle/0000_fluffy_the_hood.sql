CREATE TABLE `ai_suggestions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content_type` text NOT NULL,
	`prompt` text,
	`trending` integer DEFAULT false,
	`difficulty` text DEFAULT 'medium',
	`estimated_engagement` integer DEFAULT 75,
	`source` text DEFAULT 'ai',
	`is_used` integer DEFAULT false,
	`used_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`expires_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `ai_suggestions` (`user_id`);--> statement-breakpoint
CREATE INDEX `content_type_idx` ON `ai_suggestions` (`content_type`);--> statement-breakpoint
CREATE INDEX `trending_idx` ON `ai_suggestions` (`trending`);--> statement-breakpoint
CREATE INDEX `expires_at_idx` ON `ai_suggestions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `content_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`content_type` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`tags` text,
	`word_count` integer DEFAULT 0,
	`estimated_read_time` integer DEFAULT 0,
	`sentiment` text DEFAULT 'neutral',
	`ai_generated` integer DEFAULT false,
	`template_used` text,
	`scheduled_at` integer,
	`published_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `content_projects` (`user_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `content_projects` (`status`);--> statement-breakpoint
CREATE INDEX `content_type_idx` ON `content_projects` (`content_type`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `content_projects` (`created_at`);--> statement-breakpoint
CREATE TABLE `user_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`default_content_type` text DEFAULT 'blog',
	`default_tone` text DEFAULT 'professional',
	`timezone` text DEFAULT 'UTC',
	`language` text DEFAULT 'en',
	`ai_assistance_level` text DEFAULT 'medium',
	`auto_suggestions` integer DEFAULT true,
	`email_notifications` integer DEFAULT true,
	`analytics_tracking` integer DEFAULT true,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_settings_user_id_unique` ON `user_settings` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`profile_image_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `youtube_analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`channel_id` text NOT NULL,
	`video_id` text,
	`date` text NOT NULL,
	`views` integer DEFAULT 0,
	`watch_time_minutes` integer DEFAULT 0,
	`subscribers_gained` integer DEFAULT 0,
	`subscribers_lost` integer DEFAULT 0,
	`likes` integer DEFAULT 0,
	`dislikes` integer DEFAULT 0,
	`comments` integer DEFAULT 0,
	`shares` integer DEFAULT 0,
	`estimated_revenue` integer DEFAULT 0,
	`impressions` integer DEFAULT 0,
	`click_through_rate` integer DEFAULT 0,
	`average_view_duration` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channels`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`video_id`) REFERENCES `youtube_videos`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `channel_date_idx` ON `youtube_analytics` (`channel_id`,`date`);--> statement-breakpoint
CREATE INDEX `video_date_idx` ON `youtube_analytics` (`video_id`,`date`);--> statement-breakpoint
CREATE INDEX `date_idx` ON `youtube_analytics` (`date`);--> statement-breakpoint
CREATE TABLE `youtube_channels` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`channel_name` text NOT NULL,
	`channel_description` text,
	`channel_thumbnail` text,
	`subscriber_count` integer DEFAULT 0,
	`video_count` integer DEFAULT 0,
	`view_count` integer DEFAULT 0,
	`uploads_playlist_id` text,
	`access_token` text NOT NULL,
	`refresh_token` text NOT NULL,
	`token_expires_at` integer NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `youtube_channels_channel_id_unique` ON `youtube_channels` (`channel_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `youtube_channels` (`user_id`);--> statement-breakpoint
CREATE INDEX `channel_id_idx` ON `youtube_channels` (`channel_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_channel_unique` ON `youtube_channels` (`user_id`,`channel_id`);--> statement-breakpoint
CREATE TABLE `youtube_videos` (
	`id` text PRIMARY KEY NOT NULL,
	`channel_id` text NOT NULL,
	`video_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`thumbnail` text,
	`published_at` integer NOT NULL,
	`duration` text,
	`tags` text,
	`category_id` text,
	`view_count` integer DEFAULT 0,
	`like_count` integer DEFAULT 0,
	`dislike_count` integer DEFAULT 0,
	`comment_count` integer DEFAULT 0,
	`engagement_rate` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channels`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `youtube_videos_video_id_unique` ON `youtube_videos` (`video_id`);--> statement-breakpoint
CREATE INDEX `channel_id_idx` ON `youtube_videos` (`channel_id`);--> statement-breakpoint
CREATE INDEX `video_id_idx` ON `youtube_videos` (`video_id`);--> statement-breakpoint
CREATE INDEX `published_at_idx` ON `youtube_videos` (`published_at`);