
const inputName = document.querySelector('#productName')
const inputPrice = document.querySelector('#productPrice')

const button = document.querySelector('button')

// setTimeout(() => {
//     const body = document.querySelector('body')
//     const div = document.createElement('div')
//     const html = `
//     <h2>Este contenido lo agregamos a la web utilizando JAVASCRIPT. Esto es CSR (Client Side Rendering)</h2>
//     `

//     div.innerHTML = html
//     body.appendChild(div)  
    
// }, 3000)

const pokeApiBaseUrl = `https://pokeapi.co/api/v2/pokemon`

const createPokemon = (pokemon) =>{   // Aqui abstaraje mi codigo de abajo donde se creaba un pokemon y lo meti en una funcion para crear pokemones
    const html = `
            <h3>${pokemon.name}</h3>
            <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
            <span>#${pokemon.id}</span>
        `
        const div = document.createElement('div')
        div.classList.add('poke-card')
        div.innerHTML = html

        document.querySelector('body').appendChild(div)
    
}

fetch(`${pokeApiBaseUrl}/pikachu`)
    .then((res) =>{                       // Aca recibimos la respuesta el 
        return res.json()                 // convertimos la respues en json, que devuelve una promesa
    })
    .then((pokemon) =>{    //aca ya recibimos al pokemon 
        createPokemon(pokemon)  // <------------------ Aca llamo a la funcion de arriba de crear pokemones  

        
        //   .... de aqui para abajo es el codigo anterior de como se creaba el pokemon que le pase a la funcion crear pokemon de arriba                                  
        // console.log({ pokemon })
        // const html = `
        //     <h3>${pokemon.name}</h3>
        //     <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
        //     <span>#${pokemon.id}</span>
        // `
        // const div = document.createElement('div')
        // div.classList.add('poke-card')
        // div.innerHTML = html

        // document.querySelector('body').appendChild(div)
    })


fetch(`${pokeApiBaseUrl}/blastoise`)
    .then((res) =>{                       // Aca recibimos la respuesta el 
        return res.json()                 // convertimos la respues en json, que devuelve una promesa
    })
    .then((pokemon) =>{    
        createPokemon(pokemon)                //aca ya recibimos al pokemon                   
        // console.log({ pokemon })
        // const html = `
        //     <h3>${pokemon.name}</h3>
        //     <img src=${pokemon.sprites.front_default} alt="Esta es una imagen del pokemon: ${pokemon.name}">
        //     <span>#${pokemon.id}</span>
        // `
        // const div = document.createElement('div')
        // div.classList.add('poke-card')
        // div.innerHTML = html

        // document.querySelector('body').appendChild(div)
    })
    


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