module.exports = {
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'volunteersio-dev.s3.eu-west-2.amazonaws.com',
      process.env.NEXT_PUBLIC_IMAGES_HOST || '',
    ],
  },
};
