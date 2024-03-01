import { headers } from 'next/headers';
import { paths } from 'config/paths';
import { redirect } from 'next/navigation';
import { authOptions } from './auth';
import { getServerSession } from 'next-auth';

type Input = {
  allowOnlyLoggedInUsers?: boolean;
};

export async function getUserSession(input: Partial<Input> = {}) {
  const { allowOnlyLoggedInUsers = true } = input;
  const session = await getServerSession(authOptions);
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';

  if (!session && allowOnlyLoggedInUsers) {
    redirect(`${paths.login}?next=${pathname}`);
  }

  // eslint-disable-next-line
  const userSession: any = session;

  return {
    accessToken: userSession?.accessToken,
    id: userSession?.id,
  };
}
