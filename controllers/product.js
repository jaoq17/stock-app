const Movement = require('../models/movement')
const Product = require('../models/product')   // por defecto ya lo busca, no hace falta colocar la extension .js


const getProducts = async (req, res) => {
    // const products = await Product.aggregate({ deleted: false }).sort({_id: -1})  // peticion a la base de datos asyncrona
    
    const products = await Product.aggregate([
        {
            $match: { deleted: false},
        },
        {
            $lookup: {
                from: 'movements',
                localField: '_id',
                foreignField: 'product',
                as: 'movements'
            },
        },
        {
            $unwind: {
                path: '$movements',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: {_id: '$_id', name: '$name', price: '$price'},
                stock: {
                    $sum: '$movements.quantity',
                }
            },
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                price: '$_id.price',
                stock: 1,
            },
        },
        {
            $sort: { _id: -1},
        },
        {
            $limit: 10,
        },
    ])


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

const createMovement = (req, res) => {
    const { productId } = req.params
    const { type, quantity } = req.body
    const newMovement = new Movement({
        type,
        quantity: type === 'Compra' ? quantity : quantity * -1,
        product: productId,
     })  // tambien puedo pasarlo de la forma de abajo, pero asi es mas legible el codigo
        //  { name: req.body.name, price: req.body.price, })

    newMovement
        .save()
        .then((movement) => {
            console.log({ movement })
            res.status(201).json({ ok: true, movement })
        })
        .catch((err) => console.log(err))
}


const deleteMovement = async (req, res) => {
    const { id } = req.params

    await Movement.findByIdAndUpdate(id, {
        deleted: true,
    })
    res.status(200).json({ ok: true, message: 'Movimiento de Stock eliminado con éxito!' })
    // console.log({ id })
    
}

module.exports = { 
    getProducts,
    createProduct,
    deleteProduct,
    createMovement,
    deleteMovement,
}