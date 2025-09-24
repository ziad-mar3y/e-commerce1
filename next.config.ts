import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images:{
    remotePatterns:[
     { 
      protocol: 'https',
      hostname: 'ecommerce.routemisr.com',
      pathname: '/Route-Academy-products/**'
    },
     { 
      protocol: 'https',
      hostname: 'ecommerce.routemisr.com',
      pathname: '/Route-Academy-brands/**'
    },
     { 
      protocol: 'https',
      hostname: 'ecommerce.routemisr.com',
      pathname: '/Route-Academy-categories/**'
    }
    ]
  }


};

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/projects',
//         destination: '/projects/web',
//         permanent: true,
//       },
//       {
//         source: '/home',
//         destination: '/',
//         permanent: true,
//       },
//     ]
//   },
// }

export default nextConfig;
