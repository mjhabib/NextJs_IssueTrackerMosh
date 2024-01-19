/** @type {import('next').NextConfig} */
const nextConfig = {
  // headers: in case google did not allow us to fetch the user's profile image
  //   async headers() {
  //     return [
  //       {
  //         source: '/:path*',
  //         header: [
  //           {
  //             key: 'referrer-policy',
  //             value: 'no-referrer',
  //           },
  //         ],
  //       },
  //     ];
  //   },
};

module.exports = nextConfig;

