import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './openapi.js';

/** Mount interactive Swagger UI + raw OpenAPI JSON. */
export function setupSwagger(app) {
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openApiSpec);
  });

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
      customSiteTitle: 'DriveSafely API Docs',
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        persistAuthorization: true,
        withCredentials: true,
        docExpansion: 'list',
        displayRequestDuration: true,
        tryItOutEnabled: true,
      },
    }),
  );
}
