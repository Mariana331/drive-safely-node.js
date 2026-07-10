import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
