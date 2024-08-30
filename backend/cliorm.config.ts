import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_URL,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_HOST,
  schema: process.env.DB_HOST,
  migrationsTableName: 'core_migration_table',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // Use this only for development. For production, use a proper SSL certificate.
  },
});
// yarn typeorm:cli migration:generate src/migrations/l
