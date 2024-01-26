'use client'
import { useCallback, useEffect, useState } from 'react'
import Avatar from './avatar'
import { Database } from '../database.types'
import { redirect, useRouter } from 'next/navigation'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>()
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  while(session?.user === undefined){
    return (<>loading......</>)
  }
  const user = session?.user
  const email = session?.user.email;
  const router = useRouter();

  const getProfile = useCallback(async () => {
    if(user) {
      setLoading(true)

      let { data , error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } else {
      alert('Error loading user data!')
    } 
    {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    fullname,
    email,
    avatar_url,
  }: {
    username: string | null | undefined
    fullname: string | null
    email: string
    avatar_url: string | null | undefined
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id.toString(),
        username,
        full_name: fullname,
        avatar_url,
        is_active: true,
        is_blocked: false,
        updated_at: new Date().toISOString(),
        email,
      })
      if (error) throw error
      alert('Profile updated!');
      router.push('/profile');
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return user && email ?(
    <div className="form-widget">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, email, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  ) :
  (<span>Ther was an error in loading. Try again.</span>)
}
