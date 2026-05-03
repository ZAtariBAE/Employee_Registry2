const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Registry',
            version: '1.0.0',
            description: 'API for manging employee records'
        },
        servers: [
            {
                url: 'http://localhost:3000/v1'
            },
        ],
    },
    apis: ['./src/routes/employeeRoutes.js']
};

    const swaggerDocs = swaggerJsDoc(swaggerOptions);

    const outputPath = path.join(__dirname, 'openapi.json');
    fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2));