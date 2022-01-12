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
            if (!toBasket.includes(id)) {
                saveTosessionStorage(product)
            }

        })
    })
}

document.querySelector('.bag-icon').addEventListener('click', () => {
    window.open("basket.html", "_self");
})

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
        for (const iti of toBasket) {
            htmltemlapte += `
    <tr>
    <td>${iti.title}</td>
    <td>1</td>
    <td>${iti.price}</td>
    
    </tr>
    
    `

        }
        document.querySelector('.basket-tbody').innerHTML = htmltemlapte;
    }
    inBasketProducts()
}
// get products from sessionstorage 
let inBasketProducts = () => {
    let toBasket;
    if (sessionStorage.getItem('toBasket') === null) {
        toBasket = []
    }
    else {
        toBasket = JSON.parse(sessionStorage.getItem('toBasket'))
    }
    for (const iti of toBasket) {


    }
    document.querySelector('.basket-counter').innerHTML = toBasket.length
}
inBasketProducts()

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