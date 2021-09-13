import app from './app';
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger_output.json')

const PORT = process.env.PORT;
const HOST = 'localhost'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(PORT);
console.log(`Online on port http://${HOST}:${PORT}/docs`);
