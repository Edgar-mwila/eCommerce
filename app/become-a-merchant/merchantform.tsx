'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../database.types';
import Avatar from './avatar';

// Create a component for the Merchant Onboarding page
export default function MerchantOnboarding({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const user = session?.user;
  
  if(user){
  const [name, setName] = useState<string>('');
  const [About, setAbout] = useState<string>('');
  const [BannerUrl, setBannerUrl] = useState<string>('');

  const createMerchant = async () => {
    try {
      // Perform validations if needed
      // ...

      // Create a new merchant entry in the database
      const  error  = await supabase.from('merchants').upsert({
        name,
        About,
        BannerUrl,
        created_by_userid: user.id,
        is_active: true,
        is_blocked: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }) && supabase.from('merchant_admin').upsert({
        merchantId: 1,
        UserRole: 'Owner',
        updated_at: new Date().toISOString(),
      });

      /*const id = await supabase.from('merchants').select('id').eq('created_by_userid', user.id);

      const { } = await 
*/

      if (!error) {
        throw error;
      }

      alert('Merchant created successfully!');
      router.push('/merchant'); // Redirect to the profile page
    } catch (error) {
      console.error('Error creating merchant:', error);
      alert('Error creating merchant. Please try again.');
    }
  };

  return (
    <div className="form-widget">
      <h2 className="text-2xl font-bold mb-4">Merchant Onboarding</h2>

      <Avatar 
        uid={name} 
        size={150}
        url={BannerUrl} 
        onUpload={(url) => setBannerUrl(url)} 
      />

      <div>
        <label htmlFor="name">Shop Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter shop name"
        />
      </div>

      <div>
        <label htmlFor="about">About</label>
        <textarea
          className=''
          id="about"
          value={About}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Describe your shop"
        />
      </div>

      <div>
        <button className="button primary block" onClick={createMerchant}>
          Create Merchant
        </button>
      </div>
    </div>
  );
}
}
