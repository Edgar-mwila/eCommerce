import React from 'react'
import ProfilePage from './profile'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'

export default async function page() {
    const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <div>
      <ProfilePage session={session} />
    </div>
  )
}
