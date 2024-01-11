import { useSession } from 'next-auth/react';

type SessionData = {
  accessToken: string;
};
export const useToken = () => {
  const { data, status } = useSession();

  const sessionData = data as unknown as SessionData;
  if (status === 'unauthenticated') {
    return { token: '', status };
  }

  const token = sessionData?.accessToken || '';
  return { token, status };
};
