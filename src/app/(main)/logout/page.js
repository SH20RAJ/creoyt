"use client";
import { signOut } from 'next-auth/react'
import React from 'react'

export default function page() {

    signOut({
        callbackUrl: '/join'
    })
  return (
    <div>
      
    </div>
  )
}
