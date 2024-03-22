const Product = require('../models/product')   // por defecto ya lo busca, no hace falta colocar la extension .js


const getProducts = async (req, res) => {
    const products = await Product.find({ deleted: false }).sort({_id: -1})  // peticion a la base de datos asyncrona

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

    newProduct
        .save()
        .then((product) => {
            console.log({ product })
            res.status(201).json({ ok: true, product })
        })
        .catch((err) => console.log(err))
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    await Product.findByIdAndUpdate(id, {
        deleted: true,
    })
    res.status(200).json({ ok: true, message: 'Producto eliminado con éxito!' })
    console.log({ id })

    
}

module.exports = { getProducts, createProduct, deleteProduct }