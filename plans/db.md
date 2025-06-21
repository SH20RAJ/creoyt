// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// User and Authentication
model User {
  id            String    @id @default(cuid())
  username      String?   @unique @db.VarChar(30) @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  bio           String?   @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          Role      @default(USER)
  plan          Plan      @default(FREE)

  // YouTube Channel Info
  channels      Channel[]
  // Content & Analytics
  videos        Video[]
  analytics     Analytics[]
  // User Generated Content
  titles        SavedTitle[]
  thumbnails    Thumbnail[]
  // Engagement
  comments      Comment[]
  // Billing
  subscriptions Subscription[]
  transactions  Transaction[]

  @@index([email])
  @@index([username])
  project Project[]
  article Article[]
}

model Project {
  id          String    @id @default(cuid())
  userId      String
  name        String
  description String?   @db.Text
  jsonData    String?   @db.Text
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  article     Article[]
  @@index([userId])
}


model Article {
  id          String    @id @default(cuid())
  userId      String
  title       String
  content     String?   @db.Text
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  projectId     Project   @relation(fields: [userId], references: [id], onDelete: Cascade, map: "Article_projectId_fkey")
  articleType  ArticleType?
  @@index([userId])
}



model Channel {
  id              String    @id
  userId          String
  name            String
  description     String?   @db.Text
  customUrl       String?
  thumbnailUrl    String?
  subscriberCount Int       @default(0)
  videoCount      Int       @default(0)
  viewCount       Int       @default(0)
  lastSynced      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user           User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  videos         Video[]
  analytics      Analytics[]

  @@index([userId])
}

model Video {
  id          String    @id
  channelId   String
  userId      String
  title       String
  description String?   @db.Text
  thumbnail   String?
  duration    String?
  viewCount   Int       @default(0)
  likeCount   Int       @default(0)
  uploadDate  DateTime
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  channel     Channel   @relation(fields: [channelId], references: [id], onDelete: Cascade)
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  analytics   Analytics[]
  comments    Comment[]
  tags        Tag[]

  @@index([channelId])
  @@index([userId])
}

model Analytics {
  id          String    @id @default(cuid())
  userId      String
  channelId   String?
  videoId     String?
  date        DateTime
  views       Int       @default(0)
  likes       Int       @default(0)
  comments    Int       @default(0)
  shares      Int       @default(0)
  watchTime   Int       @default(0)
  createdAt   DateTime  @default(now())

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  channel     Channel?  @relation(fields: [channelId], references: [id], onDelete: SetNull)
  video       Video?    @relation(fields: [videoId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([channelId])
  @@index([videoId])
  @@index([date])
}

model SavedTitle {
  id          String    @id @default(cuid())
  userId      String
  title       String
  score       Float?
  tags        String?   @db.Text
  createdAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Thumbnail {
  id          String    @id @default(cuid())
  userId      String
  url         String
  title       String?
  createdAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Tag {
  id          String    @id @default(cuid())
  name        String    @unique
  videos      Video[]
  createdAt   DateTime  @default(now())

  @@index([name])
}

model Comment {
  id          String    @id @default(cuid())
  userId      String
  videoId     String
  content     String    @db.Text
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  video       Video     @relation(fields: [videoId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([videoId])
}

model Subscription {
  id          String    @id @default(cuid())
  userId      String
  plan        Plan
  status      SubStatus @default(ACTIVE)
  startDate   DateTime  @default(now())
  endDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]

  @@index([userId])
  @@index([status])
}

model Transaction {
  id              String    @id @default(cuid())
  userId          String
  subscriptionId  String
  amount          Decimal   @db.Decimal(10, 2)
  currency        String    @default("USD")
  status          PaymentStatus
  provider        String
  createdAt       DateTime  @default(now())
  
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  subscription    Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([subscriptionId])
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}

enum SubStatus {
  ACTIVE
  CANCELLED
  EXPIRED
  PENDING
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum ArticleType {
  BLOG
  NEWS
  TUTORIAL
  REVIEW
  INTERVIEW
  OPINION
  OUTLINE
  SUMMARY
  SCRIPT
  OTHER
}