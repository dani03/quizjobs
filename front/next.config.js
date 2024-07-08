import withPWAInit from "next-pwa"

const withPWA = withPWAInit({
  dest: "public",
})

export default withPWA({
  reactStrictMode: true,
  swcMinify: true,
})
