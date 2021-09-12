const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const doc = {
    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: `Documentação do ${packageJson.description}`
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
        "name": "User",
        "description": "CRUD referente ao usuário"
    }, {
        "name": "Store",
        "description": "CRUD referente às lojas"
    }]
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/backend/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
