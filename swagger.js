const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clinic Booking API',
      version: '1.0.0',
      description: 'API documentation for the clinic booking system'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: [path.join(__dirname, './routes/*.js')] // ✅ absolute path
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  // Serve raw JSON if needed
  app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Serve the UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true
  }));
}

module.exports = setupSwagger;
