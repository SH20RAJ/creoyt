import { SignOutButton } from "@clerk/nextjs"

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignOutButton redirectUrl="/join">
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  )
}
