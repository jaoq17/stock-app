require('dotenv').config()
const express = require('express')
const cors = require('cors');
const dbConnect = require('./db')   //como el archivo que esta en db se llama index.js lo toma automaticamente solo con el nonbre de la carpeta
const productRouter = require('./routes/product')


const app = express()


dbConnect(app)

app.use(cors({ origin: true }))

app.use(express.json())

app.use('/api/v1/products', productRouter )

// res.status(200).sendFile('index.html', { root: __dirname})

// app.get('/', (req, res, next) => {
//     const pokeApiBaseUrl = `https://pokeapi.co/api/v2/pokemon`
//         axios(`${pokeApiBaseUrl}/charmander`).then((axiosResponse) =>{    // Aca creo un pokemon desde el lado del servidor                     
//             const pokemon = axiosResponse.data
//             console.log({ pokemon })
//             const html = `
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <link rel="stylesheet" href="style.css">
//                 <script src="index.js" defer></script>
//                 <title>App productos</title>

//             </head>
//             <body> 
//             <h1>Nuestra app de productos normi</h1>
//             <a href="about.html">Sobre ...</a>
//             <div class="form-container">
//                     <input type="text" id="productName" placeholder="Nombre del producto">
//                     <input type="number" id="productPrice" placeholder="Precio del producto">
//                     <button>Crear producto</button>

//                 <h2>Listado de productos</h2>
//             </div>  
//             <div class="poke-card">
//                 <h3>${pokemon.name}</h3>
//                 <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
//                 <span>#${pokemon.id}</span>
//             </div>
//             </body>
//             `
//             res.send(html)     
//         })

        
//     // .then((pokemon) =>{                                     
//     //     // console.log({ pokemon })
//     //     const html = `
//     //         <h3>${pokemon.name}</h3>
//     //         <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
//     //         <span>#${pokemon.id}</span>
//     //     `
//     //     const div = document.createElement('div')
//     //     div.classList.add('poke-card')
//     //     div.innerHTML = html

//     //     document.querySelector('body').appendChild(div)
//     // })
//     // .catch()
// })

// app.use(express.static(path.join(__dirname, 'public')))    //el "static" permite que todo el contenido de la carpeta "public" este disponible para acceder desde la web


