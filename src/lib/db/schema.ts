import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, blob, index, unique } from 'drizzle-orm/sqlite-core';

// Users table - integrates with Stack Auth
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Stack Auth user ID
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  profileImageUrl: text('profile_image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}));

// YouTube channels table - users can have multiple channels
export const youtubeChannels = sqliteTable('youtube_channels', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  channelId: text('channel_id').notNull().unique(), // YouTube channel ID
  channelName: text('channel_name').notNull(),
  channelDescription: text('channel_description'),
  channelThumbnail: text('channel_thumbnail'),
  subscriberCount: integer('subscriber_count').default(0),
  videoCount: integer('video_count').default(0),
  viewCount: integer('view_count').default(0),
  uploadsPlaylistId: text('uploads_playlist_id'), // For fetching videos
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
  tokenExpiresAt: integer('token_expires_at', { mode: 'timestamp' }).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  channelIdIdx: index('channel_id_idx').on(table.channelId),
  userChannelUnique: unique('user_channel_unique').on(table.userId, table.channelId),
}));

// YouTube videos table - cache video data for performance
export const youtubeVideos = sqliteTable('youtube_videos', {
  id: text('id').primaryKey(),
  channelId: text('channel_id').notNull().references(() => youtubeChannels.id, { onDelete: 'cascade' }),
  videoId: text('video_id').notNull().unique(), // YouTube video ID
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  publishedAt: integer('published_at', { mode: 'timestamp' }).notNull(),
  duration: text('duration'), // ISO 8601 duration format
  tags: text('tags'), // JSON array of tags
  categoryId: text('category_id'),
  viewCount: integer('view_count').default(0),
  likeCount: integer('like_count').default(0),
  dislikeCount: integer('dislike_count').default(0),
  commentCount: integer('comment_count').default(0),
  engagementRate: integer('engagement_rate').default(0), // Calculated percentage
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
}, (table) => ({
  channelIdIdx: index('channel_id_idx').on(table.channelId),
  videoIdIdx: index('video_id_idx').on(table.videoId),
  publishedAtIdx: index('published_at_idx').on(table.publishedAt),
}));

// YouTube analytics data - time-series data for insights
export const youtubeAnalytics = sqliteTable('youtube_analytics', {
  id: text('id').primaryKey(),
  channelId: text('channel_id').notNull().references(() => youtubeChannels.id, { onDelete: 'cascade' }),
  videoId: text('video_id').references(() => youtubeVideos.id, { onDelete: 'cascade' }), // NULL for channel-level analytics
  date: text('date').notNull(), // YYYY-MM-DD format
  views: integer('views').default(0),
  watchTimeMinutes: integer('watch_time_minutes').default(0),
  subscribersGained: integer('subscribers_gained').default(0),
  subscribersLost: integer('subscribers_lost').default(0),
  likes: integer('likes').default(0),
  dislikes: integer('dislikes').default(0),
  comments: integer('comments').default(0),
  shares: integer('shares').default(0),
  estimatedRevenue: integer('estimated_revenue').default(0), // In cents
  impressions: integer('impressions').default(0),
  clickThroughRate: integer('click_through_rate').default(0), // Percentage * 100
  averageViewDuration: integer('average_view_duration').default(0), // Seconds
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
}, (table) => ({
  channelDateIdx: index('channel_date_idx').on(table.channelId, table.date),
  videoDateIdx: index('video_date_idx').on(table.videoId, table.date),
  dateIdx: index('date_idx').on(table.date),
}));

// Content projects - user's content creation projects
export const contentProjects = sqliteTable('content_projects', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  contentType: text('content_type').notNull(), // 'blog', 'social', 'email', 'marketing', 'video', 'podcast'
  status: text('status').default('draft').notNull(), // 'draft', 'published', 'scheduled'
  tags: text('tags'), // JSON array
  wordCount: integer('word_count').default(0),
  estimatedReadTime: integer('estimated_read_time').default(0), // Minutes
  sentiment: text('sentiment').default('neutral'), // 'positive', 'negative', 'neutral'
  aiGenerated: integer('ai_generated', { mode: 'boolean' }).default(false),
  templateUsed: text('template_used'),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  statusIdx: index('status_idx').on(table.status),
  contentTypeIdx: index('content_type_idx').on(table.contentType),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
}));

// AI suggestions - personalized content suggestions for users
export const aiSuggestions = sqliteTable('ai_suggestions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  contentType: text('content_type').notNull(),
  prompt: text('prompt'),
  trending: integer('trending', { mode: 'boolean' }).default(false),
  difficulty: text('difficulty').default('medium'), // 'easy', 'medium', 'hard'
  estimatedEngagement: integer('estimated_engagement').default(75), // Percentage
  source: text('source').default('ai'), // 'ai', 'trending', 'user_behavior'
  isUsed: integer('is_used', { mode: 'boolean' }).default(false),
  usedAt: integer('used_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  contentTypeIdx: index('content_type_idx').on(table.contentType),
  trendingIdx: index('trending_idx').on(table.trending),
  expiresAtIdx: index('expires_at_idx').on(table.expiresAt),
}));

// User settings and preferences
export const userSettings = sqliteTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  defaultContentType: text('default_content_type').default('blog'),
  defaultTone: text('default_tone').default('professional'),
  timezone: text('timezone').default('UTC'),
  language: text('language').default('en'),
  aiAssistanceLevel: text('ai_assistance_level').default('medium'), // 'low', 'medium', 'high'
  autoSuggestions: integer('auto_suggestions', { mode: 'boolean' }).default(true),
  emailNotifications: integer('email_notifications', { mode: 'boolean' }).default(true),
  analyticsTracking: integer('analytics_tracking', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type YouTubeChannel = typeof youtubeChannels.$inferSelect;
export type NewYouTubeChannel = typeof youtubeChannels.$inferInsert;

export type YouTubeVideo = typeof youtubeVideos.$inferSelect;
export type NewYouTubeVideo = typeof youtubeVideos.$inferInsert;

export type YouTubeAnalytics = typeof youtubeAnalytics.$inferSelect;
export type NewYouTubeAnalytics = typeof youtubeAnalytics.$inferInsert;

export type ContentProject = typeof contentProjects.$inferSelect;
export type NewContentProject = typeof contentProjects.$inferInsert;

export type AISuggestion = typeof aiSuggestions.$inferSelect;
export type NewAISuggestion = typeof aiSuggestions.$inferInsert;

export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;