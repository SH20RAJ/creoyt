import { signOut } from "@/auth"

export default function page() {

    signOut({
        callbackUrl: '/join'
    })
  return (
    <div>
      
    </div>
  )
}
