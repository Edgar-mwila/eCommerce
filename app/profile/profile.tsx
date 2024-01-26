'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  is_blocked: boolean;
  updated_at: string | null;
  email: string;
}

const ProfilePage = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  while(!session?.user) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    // Assuming you pass the user ID in the query parameter
    const userId = session?.user.id;

    const fetchUserProfile = async () => {
      // Fetch the user profile from Supabase using the user ID
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId);

      if (error) {
        console.error('Error fetching user profile:', error.message);
      } else {
        // Assuming you expect only one user profile, so taking the first item from the data array
        const userProfileData = data ? data[0] : null;
        setUserProfile(userProfileData);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [session?.user.id]);

  

  return userProfile ? (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="bg-white p-6 shadow-lg rounded-md">
        <div className="flex items-center justify-center">
          <img
            src={userProfile.avatar_url || '/default-avatar.png'} // Provide a default avatar image path
            alt={`${userProfile.username}'s Avatar`}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-3xl font-semibold">@{userProfile.full_name || 'No Name'}</h2>
          <p className="text-gray-600">@{userProfile.username || 'No Username'}</p>
        </div>
        <div className="mt-6">
          <p className="text-gray-700">{userProfile.email}</p>
        </div>
        <div className="mt-6">
          <p>{userProfile.is_active ? 'Active' : 'Inactive'}</p>
          <p>{userProfile.is_blocked ? 'Blocked' : 'Not Blocked'}</p>
        </div>
        <div className="mt-6">
          <p>Last Updated: {userProfile.updated_at || 'N/A'}</p>
        </div>
        <Link href={'/become-a-merchant'}><button>Become a merchant</button></Link>
        <Link href={'/buy-products'}><button>Buy products</button></Link>
      </div>
    </div>
  ): (<>error.</>)
};

export default ProfilePage;
