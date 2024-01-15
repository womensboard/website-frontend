import { paths } from 'config/paths';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export function sharedServerSideProps(callback?: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    ctx.req.headers;
    const { res, req } = ctx;

    const session = await getSession(ctx);

    if (!session) {
      res.writeHead(307, { location: `${paths.login}?next=${req.url}` });
      res.end();

      return {
        props: {},
      };
    }

    if (callback) return callback(ctx);
    return {
      props: {},
    };
  };
}
