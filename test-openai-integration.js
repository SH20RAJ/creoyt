// Test OpenAI integration
const { config } = require('dotenv');

// Load environment variables
config({ path: '.dev.vars' });

async function testOpenAIIntegration() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('❌ OPENAI_API_KEY not found in environment variables');
        console.log('Please add your OpenAI API key to .dev.vars file:');
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
                        content: 'Say "Hello from Creaovate!" if you can hear me.'
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

// Test API endpoints
async function testAPIEndpoints() {
    console.log('\n🌐 Testing local API endpoints...');

    const baseURL = 'http://localhost:3003';

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
                        content: 'Hello, can you help me create content?'
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
                topic: 'AI-powered content creation',
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
    console.log('🚀 Creaovate OpenAI Integration Test\n');

    await testOpenAIIntegration();
    await testAPIEndpoints();

    console.log('\n✨ Test completed!');
    console.log('\nNext steps:');
    console.log('1. Make sure your .dev.vars file has OPENAI_API_KEY set');
    console.log('2. Run "npm run dev" to start the development server');
    console.log('3. Visit http://localhost:3003/dashboard to test the AI features');
}

main().catch(console.error);