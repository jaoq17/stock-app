require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const { error } = require('console');
const { default: axios } = require('axios');


const app = express()

mongoose.connect(                                                                           // este "stock-app" es el nombre de la base datos que se creara en MongoDB Atlas
    `mongodb+srv://adminStockApp:${process.env.MONGO_BD_PASS}@stock-app.adhh3ph.mongodb.net/stock-app?retryWrites=true&w=majority&appName=Stock-app`
    )
    .then(( result) => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando puerto: ${PORT}`)
        })
        console.log('Conexión exitosa a la BBDD')
    })
    .catch((err) => console.log(err))


const productSchema = mongoose.Schema({      //es crear las variables para hacer el modelo
    name: {type : String, required: true},
    price: Number,
},
{timestamps: true}      //una propiedad para que se coloque la fecha
)


const Product = mongoose.model('Product', productSchema) // aca depsues de productSchema, colocaria coma y le colocaria nombre, pero si lo dejo asi, el coloca por defecto el nombre de la constante 'Product'


app.use(express.json())


app.post('/api/v1/products', (req, res) =>{

    const newProduct = new Product(req.body)  // tambien puedo pasarlo de la forma de abajo, pero asi es mas legible el codigo
         // { name: req.body.name, price: req.body.price, })

    newProduct.
        save().
        then((result) => {
            res.status(201).json({ ok: true})
        })
        .catch((err) => console.log(err))
})

// res.status(200).sendFile('index.html', { root: __dirname})

app.get('/', (req, res, next) => {
    const pokeApiBaseUrl = `https://pokeapi.co/api/v2/pokemon`
        axios(`${pokeApiBaseUrl}/charmander`).then((axiosResponse) =>{                        
            const pokemon = axiosResponse.data
            console.log({ pokemon })
            const html = `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <script src="index.js" defer></script>
                <title>App productos</title>

            </head>
            <body> 
            <h1>Nuestra app de productos normi</h1>
            <a href="about.html">Sobre ...</a>
            <div class="form-container">
                    <input type="text" id="productName" placeholder="Nombre del producto">
                    <input type="number" id="productPrice" placeholder="Precio del producto">
                    <button>Crear producto</button>

                <h2>Listado de productos</h2>
            </div>  
            <div class="poke-card">
                <h3>${pokemon.name}</h3>
                <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
                <span>#${pokemon.id}</span>
            </div>
            </body>
            `
            res.send(html)     
        })

        
    // .then((pokemon) =>{                                     
    //     // console.log({ pokemon })
    //     const html = `
    //         <h3>${pokemon.name}</h3>
    //         <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
    //         <span>#${pokemon.id}</span>
    //     `
    //     const div = document.createElement('div')
    //     div.classList.add('poke-card')
    //     div.innerHTML = html

    //     document.querySelector('body').appendChild(div)
    // })
    // .catch()
})

app.use(express.static(path.join(__dirname, 'public')))  //el "static" permite que todo el contenido de la carpeta "public" este disponible para acceder desde la web

const PORT = process.env.PORT

