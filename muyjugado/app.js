const criptos = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const moreChages = document.querySelector(".moreChanges");
const moreChagesTemplate = document.getElementById("moreChanges").content;
const moreChagesFragment = document.createDocumentFragment();

const listCripto = document.getElementById("listCripto");
const listCriptoTemplate = document.getElementById("listCriptoTemplate").content;
const listCriptoFragment = document.createDocumentFragment();

const templateSingle = document.getElementById("single").content;
const templateTop10 = document.getElementById("top10").content;
const fragmentTop10 = document.createDocumentFragment();



const comparar = (a,b) => b - a;

const getData = async (numero) => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numero}&page=1&sparkline=false`);
    const response = await data.json();

    // Lista de criptos
    response.forEach((item,index) => {

        const clone = listCriptoTemplate.cloneNode(true);
        const {name,symbol,current_price,price_change_percentage_24h,image,id} = item;
        
        clone.querySelector("article").id = id;
        clone.querySelector("span").id = id;
        clone.querySelector(".name").id = id;
        clone.querySelector(".symbol").id = id;
        clone.querySelector(".price").id = id;
        clone.querySelector(".porcentChange").id = id;
        clone.querySelector("img").id = id;

        clone.querySelector("span").innerText = `#${index + 1}`;
        clone.querySelector(".name").innerText = name;
        clone.querySelector(".symbol").innerText = symbol;
        clone.querySelector(".price").innerText = `${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
        clone.querySelector(".porcentChange").innerText = `${price_change_percentage_24h.toLocaleString('es',{ maximumFractionDigits: 2 })}`;
        clone.querySelector("img").src = image;

        clone.querySelector(".porcentChange").innerText > "0" ? clone.querySelector(".porcentChange").classList.add("green") :  clone.querySelector(".porcentChange").classList.add("red");
        
        listCriptoFragment.appendChild(clone);
    })

    listCripto.appendChild(listCriptoFragment);

    let altos = [];
    response.forEach(item => {
        const {price_change_percentage_24h} = item;
        altos.push(price_change_percentage_24h)
    })

    let altosPositivos = altos.map(item => item < 0 ? item * -1 : item);
    altosPositivos.sort(comparar)

    // Mayores cambios porcentuales
    response.forEach(item => {

        const clone = moreChagesTemplate.cloneNode(true);
        
        clone.querySelector("img").src = item.image;
        clone.querySelector("p").innerText = `$ ${item.current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
        clone.querySelector(".criptoChange").innerText = `${item.price_change_percentage_24h.toLocaleString('es',{ maximumFractionDigits: 2 })}%`;

        const {price_change_percentage_24h} = item;

        clone.querySelector(".criptoChange").innerText > "0" ? clone.querySelector(".criptoChange").classList.add("green") : clone.querySelector(".criptoChange").classList.add("red");

        price_change_percentage_24h === altosPositivos[0] || price_change_percentage_24h === altosPositivos[0]*-1 ? moreChagesFragment.appendChild(clone) : null;

        price_change_percentage_24h === altosPositivos[1] || price_change_percentage_24h === altosPositivos[1]*-1 ? moreChagesFragment.appendChild(clone) : null;

        price_change_percentage_24h === altosPositivos[2] || price_change_percentage_24h === altosPositivos[2]*-1 ? moreChagesFragment.appendChild(clone) : null;


    })

    moreChages.appendChild(moreChagesFragment);




    document.addEventListener('click', e => {
        response.forEach(item => {
            const {id,market_cap_rank,image,name,symbol,low_24h,high_24h,total_supply,current_price} = item;

            if (id === e.target.id) {
                listCripto.textContent = "";
                listCripto.classList.remove("listCripto")

                const clone = templateSingle.cloneNode(true);

                clone.querySelector(".infoImg img").src = image;
                clone.querySelector(".nameInfo").innerText = name;
                clone.querySelector(".priceChange").innerText = `$${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                clone.querySelector(".capMark").innerText = market_cap_rank;
                clone.querySelector(".symbolInfo").innerText = symbol;
                clone.querySelector(".low").innerText = `$${low_24h}`;
                clone.querySelector(".high").innerText = `$${high_24h}`;
                clone.querySelector(".total").innerText = total_supply || 'No existen datos';

                listCripto.appendChild(clone)
            }
        })
    })

}


const openNavButton = document.getElementById('bar');
const nav = document.getElementById('nav');

openedNav = false;

openNavButton.addEventListener("click",() => {
    if (!openedNav) {
        nav.style.animation= "aparecer 1s forwards";
        openedNav = true;      
    } else {
        nav.style.animation = "desaparecer 1s forwards";
        openedNav = false;
    }
    
}) 


getData(50);
document.addEventListener('click', e => {
    if (e.target.textContent === 'Mas cripto') {
        listCripto.textContent = '';
        moreChages.textContent = '';
        listCripto.classList.replace("listCriptoFlex","listCripto")
        const h2 = document.createElement("H2");
        const h2b = document.createElement("H2");
        h2b.textContent = 'Cripto con mayores cambios porcentuales en 24hs';
        h2.textContent = 'Lista critomonedas';
        listCripto.appendChild(h2);
        moreChages.appendChild(h2b);
        getData(100);
    }
    if (e.target.textContent === 'Top 10') {
        const h2 = document.createElement("H2");
        h2.innerText = 'Top 10 cripto monedas por capitalización de mercado';
        h2.classList.add("width")

        fetch(criptos)
            .then(data => data.json())
            .then(response => {
                console.log(response)
                response.forEach(item => {
                    const {image,current_price,name} = item;

                    const clone = templateTop10.cloneNode(true);

                    clone.querySelector(".nameTop10").innerText = name;
                    clone.querySelector("img").src = image;
                    clone.querySelector(".priceTop10").innerText = `$${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`

                    fragmentTop10.appendChild(clone);
                })
                
                listCripto.textContent = '';
                listCripto.classList.replace("listCripto","listCriptoFlex")
                listCripto.appendChild(h2);
                listCripto.appendChild(fragmentTop10);

            });

        
    }
})