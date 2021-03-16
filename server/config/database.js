module.exports = ({ env }) => {
  const connectionSettings =
    env('NODE_ENV') === 'development'
      ? {
          client: 'sqlite',
          filename: '.tmp/data.db',
        }
      : {
          client: 'postgres',
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          username: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD', 'postgres'),
        }

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: connectionSettings,
        options: {
          useNullAsDefault: true,
        },
      },
    },
  }
}
