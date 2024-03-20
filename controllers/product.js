const Product = require('../models/product')   // por defecto ya lo busca, no hace falta colocar la extension .js


const getProducts = async (req, res) => {
    const products = await Product.find()  // peticion a la base de datos asyncrona

    res.status(200).json({ ok: true, products })
}


const createProduct = (req, res) =>{
    if(!req.body.name){
        res
        .status(400)
        .json({
            ok: false,
            message: 'El campo Nombre del producto es obligatorio'
        })
        return
    }
    const newProduct = new Product(req.body)  // tambien puedo pasarlo de la forma de abajo, pero asi es mas legible el codigo
        //  { name: req.body.name, price: req.body.price, })

    newProduct.
        save().
        then((result) => {
            res.status(201).json({ ok: true})
        })
        .catch((err) => console.log(err))
}

module.exports = { getProducts, createProduct }