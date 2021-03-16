module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', '/'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '7cd768e942607fa430325d20caccedaa'),
    },
  },
})
