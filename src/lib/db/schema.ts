import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users & Authentication Tables
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').unique(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  subscriptionTier: text('subscription_tier').default('free'), // free, pro, enterprise
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const userProfiles = sqliteTable('user_profiles', {
  userId: text('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  company: text('company'),
  website: text('website'),
  socialLinks: text('social_links', { mode: 'json' }), // JSON object
  preferences: text('preferences', { mode: 'json' }), // JSON object
  onboardingCompleted: integer('onboarding_completed', { mode: 'boolean' }).default(false),
});

// Content Management Tables
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'), // blog, social, marketing, etc.
  status: text('status').default('draft'), // draft, active, archived
  settings: text('settings', { mode: 'json' }), // JSON object
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const content = sqliteTable('content', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  contentType: text('content_type'), // article, post, script, copy
  contentData: text('content_data', { mode: 'json' }), // JSON with content structure
  aiModelUsed: text('ai_model_used'),
  promptUsed: text('prompt_used'),
  status: text('status').default('draft'),
  wordCount: integer('word_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// AI Interaction Tables
export const aiConversations = sqliteTable('ai_conversations', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title'),
  modelUsed: text('model_used').default('llama-3.1-8b'),
  totalMessages: integer('total_messages').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const aiMessages = sqliteTable('ai_messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id').notNull().references(() => aiConversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // user, assistant, system
  content: text('content').notNull(),
  tokensUsed: integer('tokens_used'),
  responseTime: integer('response_time'), // milliseconds
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const aiUsage = sqliteTable('ai_usage', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  model: text('model').notNull(),
  tokensInput: integer('tokens_input').default(0),
  tokensOutput: integer('tokens_output').default(0),
  cost: real('cost').default(0),
  date: text('date'), // YYYY-MM-DD for daily aggregation
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Templates & Assets Tables
export const templates = sqliteTable('templates', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category'),
  templateData: text('template_data', { mode: 'json' }), // JSON object
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  usageCount: integer('usage_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const files = sqliteTable('files', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  fileType: text('file_type'),
  fileSize: integer('file_size'),
  storagePath: text('storage_path'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Analytics & Insights Tables
export const userAnalytics = sqliteTable('user_analytics', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  eventType: text('event_type'), // login, content_created, ai_query, etc.
  eventData: text('event_data', { mode: 'json' }), // JSON object
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const contentAnalytics = sqliteTable('content_analytics', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull().references(() => content.id, { onDelete: 'cascade' }),
  views: integer('views').default(0),
  shares: integer('shares').default(0),
  engagementScore: real('engagement_score').default(0),
  lastViewed: integer('last_viewed', { mode: 'timestamp' }),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Content = typeof content.$inferSelect;
export type InsertContent = typeof content.$inferInsert;
export type AIConversation = typeof aiConversations.$inferSelect;
export type InsertAIConversation = typeof aiConversations.$inferInsert;
export type AIMessage = typeof aiMessages.$inferSelect;
export type InsertAIMessage = typeof aiMessages.$inferInsert;
export type AIUsage = typeof aiUsage.$inferSelect;
export type InsertAIUsage = typeof aiUsage.$inferInsert;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = typeof templates.$inferInsert;
export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;
export type UserAnalytics = typeof userAnalytics.$inferSelect;
export type InsertUserAnalytics = typeof userAnalytics.$inferInsert;
export type ContentAnalytics = typeof contentAnalytics.$inferSelect;
export type InsertContentAnalytics = typeof contentAnalytics.$inferInsert;
