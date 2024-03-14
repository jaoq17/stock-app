require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const { error } = require('console');


const app = express()

mongoose.connect(                                                                           // este "stock-app" es el nombre de la base datos que se creara en MongoDB
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

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT

