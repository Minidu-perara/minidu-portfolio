import type { NextConfig } from "next";

const SUBSTACK_URL = "https://minidu.substack.com/";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // Routes from the previous version of the site. Their content now lives on
  // the home or portfolio page (or on Substack), so keep old links working.
  // Temporary (307) redirects so they can be reused later without browsers
  // having cached a permanent redirect.
  async redirects() {
    return [
      { source: "/about", destination: "/portfolio", permanent: false },
      { source: "/projects", destination: "/portfolio", permanent: false },
      { source: "/skills", destination: "/portfolio", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/socials", destination: "/", permanent: false },
      { source: "/writing/:path*", destination: SUBSTACK_URL, permanent: false },
      { source: "/notes/:path*", destination: SUBSTACK_URL, permanent: false },
      { source: "/Master%20Resume%20Minidu.pdf", destination: "/resume.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
