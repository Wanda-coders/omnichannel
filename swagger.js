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
        "description": "Rotas referente ao usuário"
    }, {
        "name": "Store",
        "description": "Rotas referente às lojas"
    }, {
        "name": "Catalog",
        "description": "Rotas referente ao catálogo de produtos disponíveis"
    }, {
        "name": "Photos",
        "description": "Rotas referente às fotos do catálogo de produtos disponíveis"
    }, {
        "name": "Authentication",
        "description": "Autenticação de usuário"
    }
]
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/backend/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
