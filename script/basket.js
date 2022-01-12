export { addToBasketListener, saveTosessionStorage, inBasketProducts }
let addToBasketListener = () => {
    document.querySelectorAll('.basket').forEach(title => {
        title.addEventListener('click', (e) => {

            let id = e.target.parentElement.id
            let price = e.target.previousElementSibling.innerHTML
            let title = e.target.previousElementSibling.previousElementSibling.innerHTML
            let product = { id: id, price: price, title: title }
            console.log(product);
            let toBasket;
            if (sessionStorage.getItem('toBasket') === null) {
                toBasket = []
            }
            else {
                toBasket = JSON.parse(sessionStorage.getItem('toBasket'))
            }
            let ids = []
            for (const iterator of toBasket) {
                ids.push(iterator.id)
            }
            if (!ids.includes(id)) {
                saveTosessionStorage(product)
            }
            inBasketProducts()
        })
    })
}

document.querySelector('.bag-icon').addEventListener('click', () => {
    window.open("basket.html", "_self");
})
let appendBasket = () => {
    if (document.title.includes("basket")) {
        let inBasketProducts = () => {
            let toBasket;
            let htmltemlapte = "";
            if (sessionStorage.getItem('toBasket') === null) {
                toBasket = []
            }
            else {
                toBasket = JSON.parse(sessionStorage.getItem('toBasket'))
            }
            let total = 0;
            let itemcounter = 0;
            for (const iti of toBasket) {
                total += parseInt(iti.price)
                itemcounter++
                htmltemlapte += `
                <tr>
                <td class="delete-x" id="${iti.id}">x</td>
                <td>${iti.title}</td>
                <td>1</td>
                <td>${iti.price}</td>
                <td>HUF</td>
                
                </tr>
                
                     `

            }
            document.querySelector('.basket-tbody').innerHTML = htmltemlapte;
            document.querySelector('.basket-tfoot').innerHTML = ` 
            <tr> 
            <td></td>
            <td>Total</td>
            <td>${itemcounter}</td>
            <td>${total}</td>
            <td>HUF</td>
            
            </tr> 
             <tr> 
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button>Checkout</button></td>
            
            </tr>`;

        }
        inBasketProducts()
    }
}
appendBasket()
// get products from sessionstorage 
let inBasketProducts = () => {
    let toBasket;
    if (sessionStorage.getItem('toBasket') === null) {
        toBasket = []
    }
    else {
        toBasket = JSON.parse(sessionStorage.getItem('toBasket'))
    }

    document.querySelector('.basket-counter').innerHTML = toBasket.length
}
inBasketProducts()
let xListeners = () => {
    document.querySelectorAll('.delete-x').forEach(item => {
        item.addEventListener('click', (e) => {

            deleteFromsessionStorage(e.target)
        })
    })
}
xListeners()

// Delete cards from the sessionStorage
const deleteFromsessionStorage = (item) => {
    let toBasket;
    if (sessionStorage.getItem('toBasket') === null) {
        toBasket = []
    }
    else {
        toBasket = JSON.parse(sessionStorage.getItem('toBasket'))

    }
    let itemToRemoveIndex = toBasket.indexOf(item.parentElement)


    for (const iterator of toBasket) {
        if (iterator.id == item.id) {
            itemToRemoveIndex = toBasket.indexOf(iterator)
        }

    }
    toBasket.splice(toBasket.indexOf(itemToRemoveIndex), 1);
    sessionStorage.setItem('toBasket', JSON.stringify(toBasket))
    inBasketProducts()
    appendBasket()
    xListeners()

}


// save selected product etc to session storage 
const saveTosessionStorage = (item) => {
    let toBasket;
    if (sessionStorage.getItem('toBasket') === null) {
        toBasket = []
    }
    else {
        toBasket = JSON.parse(sessionStorage.getItem('toBasket'))
    }
    toBasket.push(item)
    sessionStorage.setItem('toBasket', JSON.stringify(toBasket))

}