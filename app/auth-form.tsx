'use client'
import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const [view, setView] = useState<'sign_up' | 'sign_in'>('sign_up');

  const handleToggleView = () => {
    setView((prevView) => (prevView === 'sign_up' ? 'sign_in' : 'sign_up'));
  };

  const getRedirectTo = () => {
    return view === 'sign_up' ? 'http://localhost:3000/account' : 'http://localhost:3000/profile';
  };

  return (
    <>
      <button onClick={handleToggleView}>
        {view === 'sign_up' ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        showLinks={false}
        providers={[]}
        redirectTo={getRedirectTo()} // Dynamically set redirect based on the current view
      />
    </>
  );
}
