import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { config } from 'dotenv';

config();

const router = Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    basePath: '',
    info: {
      title: 'Play food delivery',
      version: '1.0.0',
      description:
          'Food delivery fight covid 2019',
      license: {
        name: 'Playtorium',
        url: 'https://playtorium.co.th/'
      },
      contact: {
        name: 'Vathunyoo',
        email: 'vathunyoo@playtorium.co.th'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: {
      bearerAuth: []
    },
    servers: [
      {
        url: 'https://docker-testing-env.playtorium.co.th/plays-food-delivery-backend/api',
        description: 'Real server backend'
      },
      {
        url: 'https://testing-backend-pfd.playtorium.co.th/api',
        description: 'No sub domain server backend'
      },
      {
        url: `http://localhost:${process.env.BACKEND_PORT}/api`,
        description: 'Local backend'
      },
      {
        url: 'https://staging-backend-pfd.playtorium.co.th/api',
        description: 'staging backend'
      },
      {
        url: 'https://production-backend-pfd.playtorium.co.th/api',
        description: 'production backend'
      }
    ]
  },
  apis: [
    './server/swaggers/routes/auth.yml',
    './server/swaggers/routes/customer.yml',
    './server/swaggers/routes/product.yml',
    './server/swaggers/routes/address.yml',
    './server/swaggers/routes/order.yml',
    './server/swaggers/schemas/auth.yml',
    './server/swaggers/schemas/product.yml'
  ]
};

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, {
  explorer: true
}));

export default router;