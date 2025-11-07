// Setup Turso database with schema
import { createClient } from '@libsql/client';

async function setupDatabase() {
    console.log('🚀 Setting up YT Copilot Database on Turso...\n');

    const url = "libsql://creovate-sh20raj.aws-ap-south-1.turso.io";
    const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjIxNzg2NDQsImlkIjoiMzdlY2M2MDQtYmQ1NC00ZmMyLWE5MGQtZjY3ZWNkMmFiMjdhIiwicmlkIjoiZTNkMzc4YWItMmExOS00NzBlLTkwOGUtNjM4MTlmOWMwYjM5In0.eqgrgDlPp8CuupB_NDQyRtTfWxwropWAWn96JR2pbRNe63krYxRJLmzOTheLpNi94xJMwHA_VcoMuMXmq1VwGDw";

    const client = createClient({
        url,
        authToken,
    });

    try {
        console.log('🔌 Connecting to Turso database...');

        // Test connection
        await client.execute('SELECT 1');
        console.log('✅ Connected successfully!');

        // Create users table first (since other tables reference it)
        console.log('\n📋 Creating users table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id text PRIMARY KEY NOT NULL,
        email text NOT NULL,
        username text,
        full_name text,
        avatar_url text,
        subscription_tier text DEFAULT 'free',
        created_at integer DEFAULT (unixepoch()),
        updated_at integer DEFAULT (unixepoch()),
        last_login integer,
        is_active integer DEFAULT true
      )
    `);

        // Create unique indexes for users
        await client.execute('CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email)');
        await client.execute('CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username)');
        console.log('✅ Users table created');

        // Create projects table
        console.log('📋 Creating projects table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id text PRIMARY KEY NOT NULL,
        user_id text NOT NULL,
        title text NOT NULL,
        description text,
        category text,
        status text DEFAULT 'draft',
        settings text,
        created_at integer DEFAULT (unixepoch()),
        updated_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ Projects table created');

        // Create AI conversations table with updated model
        console.log('📋 Creating ai_conversations table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS ai_conversations (
        id text PRIMARY KEY NOT NULL,
        user_id text NOT NULL,
        title text,
        model_used text DEFAULT 'gpt-3.5-turbo',
        total_messages integer DEFAULT 0,
        created_at integer DEFAULT (unixepoch()),
        updated_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ AI conversations table created');

        // Create AI messages table
        console.log('📋 Creating ai_messages table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS ai_messages (
        id text PRIMARY KEY NOT NULL,
        conversation_id text NOT NULL,
        role text NOT NULL,
        content text NOT NULL,
        tokens_used integer,
        response_time integer,
        created_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ AI messages table created');

        // Create AI usage table
        console.log('📋 Creating ai_usage table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS ai_usage (
        id text PRIMARY KEY NOT NULL,
        user_id text NOT NULL,
        model text NOT NULL,
        tokens_input integer DEFAULT 0,
        tokens_output integer DEFAULT 0,
        cost real DEFAULT 0,
        date text,
        created_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ AI usage table created');

        // Create content table
        console.log('📋 Creating content table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS content (
        id text PRIMARY KEY NOT NULL,
        project_id text,
        user_id text NOT NULL,
        title text NOT NULL,
        content_type text,
        content_data text,
        ai_model_used text,
        prompt_used text,
        status text DEFAULT 'draft',
        word_count integer DEFAULT 0,
        created_at integer DEFAULT (unixepoch()),
        updated_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE no action ON DELETE cascade,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ Content table created');

        // Create content analytics table
        console.log('📋 Creating content_analytics table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS content_analytics (
        id text PRIMARY KEY NOT NULL,
        content_id text NOT NULL,
        views integer DEFAULT 0,
        shares integer DEFAULT 0,
        engagement_score real DEFAULT 0,
        last_viewed integer,
        FOREIGN KEY (content_id) REFERENCES content(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ Content analytics table created');

        // Create files table
        console.log('📋 Creating files table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS files (
        id text PRIMARY KEY NOT NULL,
        user_id text NOT NULL,
        filename text NOT NULL,
        file_type text,
        file_size integer,
        storage_path text,
        created_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ Files table created');

        // Create templates table
        console.log('📋 Creating templates table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS templates (
        id text PRIMARY KEY NOT NULL,
        user_id text,
        name text NOT NULL,
        description text,
        category text,
        template_data text,
        is_public integer DEFAULT false,
        usage_count integer DEFAULT 0,
        created_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ Templates table created');

        // Create user analytics table
        console.log('📋 Creating user_analytics table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS user_analytics (
        id text PRIMARY KEY NOT NULL,
        user_id text NOT NULL,
        event_type text,
        event_data text,
        created_at integer DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ User analytics table created');

        // Create user profiles table
        console.log('📋 Creating user_profiles table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id text PRIMARY KEY NOT NULL,
        bio text,
        company text,
        website text,
        social_links text,
        preferences text,
        onboarding_completed integer DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
      )
    `);
        console.log('✅ User profiles table created');

        // Verify all tables were created
        console.log('\n🔍 Verifying database schema...');
        const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");

        console.log('📊 Created tables:');
        tables.rows.forEach(row => {
            console.log('  ✓', row.name);
        });

        console.log(`\n🎉 Database setup complete! Created ${tables.rows.length} tables.`);
        console.log('🚀 YT Copilot is ready to use with Turso database!');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        console.error('Full error:', error);
    }
}

setupDatabase().catch(console.error);