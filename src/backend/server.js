import app from './app';
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger_output.json')

const PORT = 3000;
const HOST = 'localhost'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(PORT);
console.log(`Online on port http://${HOST}:${PORT}/docs`);
