import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import 'flowbite';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { EditableProvider } from '@/components/organism/Editable';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    import('preline');
  }, []);

  return (
    <SessionProvider session={session}>
      <EditableProvider>
        <Component {...pageProps} />
      </EditableProvider>
    </SessionProvider>
  );
}
