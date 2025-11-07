Perfect — your Google Cloud setup is 💯 correct.
Now that you have your **Client ID**, **Client Secret**, and the JSON file — you’re ready to integrate it fully with your website.

Here’s your **ready-to-paste Cursor prompt** that will automatically scaffold the entire **YouTube OAuth + multi-channel + analytics** API system inside a **Next.js 15 (App Router)** project.

---

## 🧠 **Cursor AI Prompt for You**

> 📝 Copy everything below and paste it directly into Cursor

---

**Prompt:**

> Build a **YouTube multi-channel authentication and analytics system** for a Next.js 15 App Router project.
> The app already uses StackAuth for normal user login. Now we want to let logged-in users connect one or more YouTube channels to their dashboard.
>
> ### ✅ Requirements
>
> 1. Use **Google OAuth 2.0** with the credentials from Google Cloud (YouTube Data API v3 + YouTube Analytics API enabled).
> 2. Use these environment variables (to be placed in `.env.local`):
>
>    ```bash
>    GOOGLE_CLIENT_ID=your_client_id_here
>    GOOGLE_CLIENT_SECRET=your_client_secret_here
>    GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/youtube/callback
>    NEXT_PUBLIC_BASE_URL=http://localhost:3000
>    ```
>
>    In production it will change to:
>
>    ```bash
>    GOOGLE_REDIRECT_URI=https://yt-copilot.strivio.world/api/auth/youtube/callback
>    NEXT_PUBLIC_BASE_URL=https://yt-copilot.strivio.world
>    ```
> (These are already set in your `.env.local`.)
> ### 🧩 Folder Structure
>
> Create the following inside `/app/api`:
>
> ```
> /app/api
>   /auth
>     /youtube
>       route.js                 → Starts OAuth (redirects to Google)
>       /callback/route.js       → Handles redirect, exchanges code for tokens, stores in DB
>   /youtube
>     /videos/route.js           → Fetches latest 20 videos of user channel
>     /analytics/route.js        → Fetches analytics metrics for a channel
> ```
>
> ### 🗃️ Database
> Each user can connect multiple YouTube channels.
> Store each channel’s OAuth tokens separately.
>
> ### ⚙️ Routes Logic
>
> **1️⃣ `/api/auth/youtube`**
>
> * Build the OAuth URL and redirect user to Google.
> * Request scopes:
>
>   ```
>   https://www.googleapis.com/auth/youtube.readonly
>   https://www.googleapis.com/auth/youtube
>   https://www.googleapis.com/auth/yt-analytics.readonly
>   ```
>
> **2️⃣ `/api/auth/youtube/callback`**
>
> * Exchange `code` for tokens from `https://oauth2.googleapis.com/token`.
> * Use the `access_token` to get the user’s channel info from:
>
>   ```
>   https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&mine=true
>   ```
> * Save `access_token`, `refresh_token`, `expires_in`, `channelId`, and `channelName` in the DB.
> * Return a success JSON like:
>
>   ```json
>   { "success": true, "channel": { "id": "...", "title": "..." } }
>   ```
>
> **3️⃣ `/api/youtube/videos`**
>
> * Use stored token to fetch last 20 videos from the user’s uploads playlist:
>
>   ```
>   https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UPLOADS_PLAYLIST_ID&maxResults=20
>   ```
> * Return as JSON.
>
> **4️⃣ `/api/youtube/analytics`**
>
> * Use YouTube Analytics API to fetch:
>
>   * Views
>   * Likes
>   * Subscribers gained/lost
>     Example request:
>
>   ```
>   https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==<CHANNEL_ID>&metrics=views,likes,subscribersGained,subscribersLost&startDate=2024-01-01&endDate=2025-11-07
>   ```
> * Return data in JSON.
>
> ### 🔁 Token Refresh Logic
>
> * If access token expires, refresh using:
>
>   ```
>   POST https://oauth2.googleapis.com/token
>   grant_type=refresh_token
>   refresh_token=<stored_refresh_token>
>   ```
>
> ### 🧠 Bonus (if possible)
>
> * Add `/api/youtube/ideas` route that uses OpenAI API to generate 5 new video ideas based on the user’s top 5 performing videos’ titles.
> * Prompt: “Based on these titles, generate 5 new video ideas likely to perform well on YouTube.”
>
> ### 💡 Notes
>
> * Use `fetch()` instead of axios.
> * Add comments explaining each step.
> * Use ESM syntax (`export async function GET()`).
> * Return proper JSON responses.
> * Use `try/catch` with proper error messages.
> * Add temporary in-memory store if Prisma is not connected.
>
> Once generated, show me all the route files with full code.

---

When you paste this in Cursor, it will automatically:

* Scaffold all 4 API routes
* Handle OAuth + token exchange
* Create video and analytics fetching endpoints
* Optionally add the OpenAI idea generator route

---

Would you like me to include the **frontend part next** (i.e. a “Connect YouTube” button, dashboard showing connected channels, and video list UI)?
That can be your next Cursor prompt once backend is ready.
