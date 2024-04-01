const mongoose = require('mongoose')

const movementSchema = mongoose.Schema({      //es crear las variables para hacer el modelo
    
    type: String, // una compra o una venta
    quantity: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    deleted: { type: Boolean, default: false},
},
{timestamps: true}      //una propiedad para que se coloque la fecha
)


const Movement = mongoose.model('Movement', movementSchema) // aca despues de MovementSchema, colocaria coma y le colocaria nombre, pero si lo dejo asi, el coloca por defecto el nombre de la constante 'Movement'


module.exports = Movement
