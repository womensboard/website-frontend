import Head from 'next/head';
import { SeoProps } from './paths';

type SeoPropType = {
  name: keyof typeof SeoProps;
};

const Seo = (props: SeoPropType) => {
  const { name } = props;
  const option = SeoProps[name];

  const { description, title, image } = option;
  return (
    <Head>
      <title>Women&apos;s Board</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="keyword"
        content="volunteers, community service, non-profits"
      />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />;
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
    </Head>
  );
};

export default Seo;
