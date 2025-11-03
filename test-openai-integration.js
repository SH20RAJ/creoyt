// Test OpenAI integration for YT Copilot
const { config } = require('dotenv');

// Load environment variables
config({ path: '.env.local' });

async function testOpenAIIntegration() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('❌ OPENAI_API_KEY not found in environment variables');
        console.log('Please add your OpenAI API key to .env.local file:');
        console.log('OPENAI_API_KEY="your-openai-api-key-here"');
        return;
    }

    console.log('🔑 OpenAI API Key found');
    console.log('🧪 Testing OpenAI API connection...');

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: 'Say "Hello from YT Copilot!" if you can hear me.'
                    }
                ],
                max_tokens: 50,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content;

        console.log('✅ OpenAI API connection successful!');
        console.log('🤖 AI Response:', aiResponse);
        console.log('📊 Usage:', data.usage);
        console.log('💰 Estimated cost: $' + ((data.usage.prompt_tokens * 0.0015 + data.usage.completion_tokens * 0.002) / 1000).toFixed(6));

    } catch (error) {
        console.error('❌ OpenAI API test failed:', error.message);

        if (error.message.includes('401')) {
            console.log('🔐 This looks like an authentication error. Please check your API key.');
        } else if (error.message.includes('429')) {
            console.log('⏰ Rate limit exceeded. Please try again later.');
        } else if (error.message.includes('insufficient_quota')) {
            console.log('💳 Insufficient quota. Please check your OpenAI billing.');
        }
    }
}

// Test Turso database connection
async function testTursoConnection() {
    console.log('\n🗄️ Testing Turso database connection...');

    const dbUrl = process.env.TURSO_DB_URL;
    const dbToken = process.env.TURSO_DB_TOKEN;

    if (!dbUrl || !dbToken) {
        console.log('⚠️  Turso credentials not found in environment variables');
        console.log('Please add to .env.local:');
        console.log('TURSO_DB_URL="libsql://your-database.turso.io"');
        console.log('TURSO_DB_TOKEN="your-turso-token"');
        return;
    }

    console.log('🔑 Turso credentials found');
    console.log('📍 Database URL:', dbUrl.replace(/\/\/.*@/, '//***@'));

    try {
        // Simple test - we'll just check if credentials are valid format
        if (dbUrl.startsWith('libsql://') && dbToken.length > 50) {
            console.log('✅ Turso configuration appears valid');
            console.log('💡 Run "npm run db:studio" to open database management');
        } else {
            console.log('⚠️  Turso configuration format may be incorrect');
        }
    } catch (error) {
        console.error('❌ Turso connection test failed:', error.message);
    }
}

// Test API endpoints
async function testAPIEndpoints() {
    console.log('\n🌐 Testing local API endpoints...');

    const baseURL = 'http://localhost:3000';

    // Test chat endpoint
    try {
        const chatResponse = await fetch(`${baseURL}/api/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: 'Hello, can you help me create YouTube content?'
                    }
                ]
            })
        });

        if (chatResponse.ok) {
            const chatData = await chatResponse.json();
            console.log('✅ Chat API endpoint working');
            console.log('🤖 Response preview:', chatData.response.substring(0, 100) + '...');
        } else {
            console.log('⚠️  Chat API endpoint returned:', chatResponse.status);
        }
    } catch (error) {
        console.log('⚠️  Chat API endpoint not available (server may not be running)');
    }

    // Test content generation endpoint
    try {
        const contentResponse = await fetch(`${baseURL}/api/ai/content?action=generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contentType: 'blog_post',
                topic: 'YouTube content creation with AI',
                tone: 'professional'
            })
        });

        if (contentResponse.ok) {
            const contentData = await contentResponse.json();
            console.log('✅ Content generation API endpoint working');
            console.log('📝 Generated content preview:', contentData.content.substring(0, 100) + '...');
        } else {
            console.log('⚠️  Content API endpoint returned:', contentResponse.status);
        }
    } catch (error) {
        console.log('⚠️  Content API endpoint not available (server may not be running)');
    }
}

async function main() {
    console.log('🚀 YT Copilot Integration Test\n');

    await testOpenAIIntegration();
    await testTursoConnection();
    await testAPIEndpoints();

    console.log('\n✨ Test completed!');
    console.log('\nNext steps:');
    console.log('1. Make sure your .env.local file has all required variables');
    console.log('2. Run "npm run db:push" to sync database schema');
    console.log('3. Run "npm run dev" to start the development server');
    console.log('4. Visit http://localhost:3000/dashboard to test YT Copilot features');
    console.log('5. Visit https://yt-copilot.strivio.world for production');
}

main().catch(console.error);