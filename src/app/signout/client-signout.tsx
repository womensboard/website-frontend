'use client';
import { LoadingSpiner } from '@/components/atom/loading-spinner';
import { paths } from 'config/paths';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

export const ClientSignout = () => {
  useEffect(() => {
    async function signOutUser() {
      await signOut({ callbackUrl: paths.home });
    }
    signOutUser();
  }, []);

  return (
    <div className="h-screen w-screen grid place-items-center">
      <div>
        Signing out <LoadingSpiner />
      </div>
    </div>
  );
};
