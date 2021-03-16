module.exports = ({ env }) => ({
  email: {
    provider: 'mailgun',
    providerOptions: {
      apiKey: env('MAILGUN_API_KEY'),
      domain: env('MAILGUN_DOMAIN'),
      host: env('MAILGUN_HOST'),
    },
    settings: {
      defaultFrom: env('MAIL_FROM'),
      defaultReplyTo: env('MAIL_REPLY_TO'),
    },
  },
})
