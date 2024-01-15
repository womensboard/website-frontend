'use client';
import { paths } from 'config/paths';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { SyntheticEvent, useEffect } from 'react';

const googleLogo = '/assets/images/google-logo.png';

export const LoginActions = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const pathname = usePathname() as string;
  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      window.alert('Login failed. Most like a wrong email was used');
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const routerNextURL = searchParams?.get('next') as string;
    const callbackUrl = routerNextURL || paths.adminHome;
    signIn('google', { callbackUrl });
  };

  return (
    <button
      type="button"
      className="flex p-[10px_30px] rounded-xl shadow-lg bg-white"
      onClick={handleClick}
    >
      <Image
        src={googleLogo}
        alt="logo"
        width={40}
        height={40}
        className="object-cover mr-[20px]"
      />

      <span>
        <h2 className="text-[20px]">Login with Google</h2>
        <p className="text-[12px]">Login with your Google Account</p>
      </span>
    </button>
  );
};
