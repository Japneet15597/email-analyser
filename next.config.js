module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
