require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) =>{
    console.log("Peticion recibida")

    res.status(200).send('<h1>Hola mundo con NODEMON</h1>')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor escuchando puerto: ${PORT}`)
})