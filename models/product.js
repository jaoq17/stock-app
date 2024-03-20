const mongoose = require('mongoose')

const productSchema = mongoose.Schema({      //es crear las variables para hacer el modelo
    name: {type : String, required: true},
    price: Number,
},
{timestamps: true}      //una propiedad para que se coloque la fecha
)


const Product = mongoose.model('Product', productSchema) // aca depsues de productSchema, colocaria coma y le colocaria nombre, pero si lo dejo asi, el coloca por defecto el nombre de la constante 'Product'


module.exports = Product
