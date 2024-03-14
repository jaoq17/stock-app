
const inputName = document.querySelector('#productName')
const inputPrice = document.querySelector('#productPrice')


const button = document.querySelector('button')
    
button.addEventListener('click', (e) => {
    // console.log({ name: inputName.value, price:inputPrice.value })
    const name = inputName.value
    const price = inputPrice.value

    fetch('/api/v1/products', {
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({      //Json.stringify: es un json contenido es un string
            name,                   //es como colocar name: name  nueva forma mas facil si la variable se llama igual
            price,
        }) ,
    })
}) 