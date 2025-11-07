import { NextResponse } from "next/server";
import { db, users } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

// GET all users
export async function GET() {
  try {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST new user
export async function POST(request) {
  try {
    const { id, email, displayName, profileImageUrl } = await request.json();

    if (!id || !email) {
      return NextResponse.json({ error: "ID and email are required" }, { status: 400 });
    }

    const db = getDB();
    
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.id, id)).limit(1);
    
    if (existingUser.length > 0) {
      // Update existing user
      const updatedUser = await db.update(users)
        .set({
          email,
          displayName,
          profileImageUrl,
          updatedAt: new Date()
        })
        .where(eq(users.id, id))
        .returning();
        
      return NextResponse.json(updatedUser[0]);
    } else {
      // Create new user
      const newUser = await db.insert(users).values({
        id,
        email,
        displayName,
        profileImageUrl,
      }).returning();

      return NextResponse.json(newUser[0], { status: 201 });
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json({ error: "Failed to create/update user" }, { status: 500 });
  }
}
