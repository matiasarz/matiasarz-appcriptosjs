const criptos = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";
const main = document.querySelector(".main");
const containerTop10 = document.createElement("DIV");
containerTop10.classList.add("containerTop10");

// Elementos de la lista
const cardCripto = document.getElementById("cardCripto");
const templateCardCripto = document.getElementById("templateCardCripto").content;
const fragmentCardCripto = document.createDocumentFragment();

// Elementos de cambios % en el precio de la cripto top 3
const changesCripto = document.getElementById("changesCripto");
const templateChangesCripto = document.getElementById("templateChangesCripto").content;
const fragmentChangesCripto = document.createDocumentFragment();

// Elementos de informacion individual
const templateCardOneInfo = document.getElementById("templateCardOneInfo").content;

// Buscador en el navbar 
const searcher = document.getElementById("searcher");
const getCripto = document.getElementById("getCripto");
const templateGetCripto = document.getElementById("templateGetCripto").content;
const fragmentGetCripto = document.createDocumentFragment();
//Buscador desktop 
const searcherDesktop = document.getElementById("searcherDesktop");

// // Tipo de cambio
const templateTop10 = document.getElementById('templateTop10').content;

const comparar = (a,b) => b - a;

const getData = async (cantidad) => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cantidad}&page=1&sparkline=false`);
    const response = await data.json();

    // Vamos a usar esto como referencia para ver la informacion
    console.log(response);

    let higherChange = [];

    // Peticion de la API para hacer la lista de criptos
    response.forEach((item,index) => {
        const clone = templateCardCripto.cloneNode(true);

        const {name,symbol,current_price,image,price_change_percentage_24h,id} = item;

        higherChange.push(price_change_percentage_24h);

        clone.querySelector(".cardCripto").id = id;
        clone.querySelector(".cardCriptoImg").id = id;
        clone.querySelector("img").id = id;
        clone.querySelector(".cardCriptoName").id = id;
        clone.querySelector(".criptoName").id = id;
        clone.querySelector(".flex").id = id;
        clone.querySelector(".criptoRank").id = id;
        clone.querySelector(".criptoSymbol").id = id;
        clone.querySelector(".cardCriptoPrice").id = id;
        clone.querySelector(".cardCriptoPrice p").id = id;
        clone.querySelector(".cardCriptoChange").id = id;
        clone.querySelector(".cardCriptoChange p").id = id;
        

        clone.querySelector(".cardCriptoName .criptoName").innerText = name;
        clone.querySelector(".cardCriptoName .criptoRank").innerText = index + 1;
        clone.querySelector(".cardCriptoName .criptoSymbol").innerText = symbol;
        clone.querySelector(".cardCriptoPrice p").innerText = `${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
        clone.querySelector(".cardCriptoChange p").innerText = `${price_change_percentage_24h.toLocaleString('es',{ maximumFractionDigits: 2 })} %`;
        clone.querySelector(".cardCriptoImg img").src = image;

        clone.querySelector(".cardCriptoChange p").innerText > "0" ? clone.querySelector(".cardCriptoChange p").classList.add("green") : clone.querySelector(".cardCriptoChange p").classList.add("red");

        clone.querySelector(".cardCriptoChange p").innerText > "0" ? clone.querySelector(".cardCriptoChange p").classList.add("fa-solid","fa-caret-up") : clone.querySelector(".cardCriptoChange p").classList.add("fa-solid","fa-caret-down");

        fragmentCardCripto.appendChild(clone);
    })
    cardCripto.appendChild(fragmentCardCripto)

    let higherChangePositive = higherChange.map(item => item < 0 ? item * -1 : item);
    higherChangePositive.sort(comparar)

    // Peticion de la API para hacer los mayores cambios % 
    response.forEach(item => {
        const clone = templateChangesCripto.cloneNode(true);

        const {name,current_price,image,price_change_percentage_24h,id} = item;

        clone.querySelector(".cardChangesCripto").id = id;
        clone.querySelector(".cardChangesCripto .changesCriptoName").id = id;
        clone.querySelector(".cardChangesCripto img").id = id;
        clone.querySelector(".cardChangesCripto .changesCriptoPrice").id = id;
        clone.querySelector(".cardChangesCripto .changesCriptoChange").id = id;        
        
        clone.querySelector(".cardChangesCripto .changesCriptoName").innerText = name;
        clone.querySelector(".cardChangesCripto img").src = image;
        clone.querySelector(".cardChangesCripto .changesCriptoPrice").innerText = `$ ${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
        clone.querySelector(".cardChangesCripto .changesCriptoChange").innerText = `${price_change_percentage_24h.toLocaleString('es',{ maximumFractionDigits: 2 })}%`;

        let conditional = clone.querySelector(".cardChangesCripto .changesCriptoChange").innerText;
        let verify = clone.querySelector(".cardChangesCripto .changesCriptoChange");
        let secondVerify = clone.querySelector(".cardChangesCripto");

        conditional > "0" ? verify.classList.add("green") : verify.classList.add("red");
        conditional > "0" ? verify.classList.add("fa-solid","fa-caret-up") : verify.classList.add("fa-solid","fa-caret-down");
        conditional > "0" ? secondVerify.classList.add("outlineGreen") : secondVerify.classList.add("outlineRed");

        let porcentage = price_change_percentage_24h;

        porcentage === higherChangePositive[0] || porcentage === higherChangePositive[0]*-1 ? changesCripto.appendChild(clone) : null;

        porcentage === higherChangePositive[1] || porcentage === higherChangePositive[1]*-1 ? changesCripto.appendChild(clone) : null;

        porcentage === higherChangePositive[2] || porcentage === higherChangePositive[2]*-1 ? changesCripto.appendChild(clone) : null;
    })
    changesCripto.appendChild(fragmentChangesCripto)

    // Informacion personal de cada cripto
    document.addEventListener('click', e => {
        

        response.forEach(item => {
            const {id,market_cap_rank,image,name,symbol,low_24h,high_24h,total_supply,current_price,circulating_supply} = item;

            if (id === e.target.id) {
                cardCripto.textContent = "";
                changesCripto.textContent = "";
                containerTop10.textContent = '';
                getCripto.textContent = "";
                searcher.value = '';
                searcherDesktop.value = '';

                document.querySelector(".listCripto").style.display = 'none';
                document.querySelector(".main h2").innerText = name;
                document.querySelector(".main h2").id = 'lista';

                window.scrollTo(0,0);

                const clone = templateCardOneInfo.cloneNode(true);
                clone.querySelector(".exchangeRate img").src = image;
                clone.querySelector(".exchangeRate span").innerText = symbol;

                clone.querySelector(".cardOneImg img").src = image;
                clone.querySelector(".cardOneSymbol").innerText = symbol;
                clone.querySelector(".cardOneRank").innerText = market_cap_rank;
                clone.querySelector(".cardOneSupply").innerText = `${circulating_supply.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                
                clone.querySelector(".cardOnePrice").innerText = `$${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                clone.querySelector(".cardOneHigh").innerText = `$${high_24h.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                clone.querySelector(".cardOneLow").innerText = `$${low_24h.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                clone.querySelector(".cardOneTotalSupply").innerText = total_supply || 'No existen datos';

                cardCripto.appendChild(clone)
            }
        })
    })

    // Tipo de cambio
    document.addEventListener('click', e => {
        const exchangeRate = document.querySelector(".exchangeRate");
        const original = document.getElementById("original");
        const money = document.getElementById("money");
        const currency = document.querySelector('.moneyExchange');
        const dolarBlue = 203;
        const reverseI = document.getElementById("reverse");

        
        // if (e.target.id === reverseI.id) {
        //     exchangeRate.classList.toggle('changeDirection');
        //     exchangeRate.className === 'exchangeRate changeDirection' ? original.setAttribute('readonly','true') : original.removeAttribute('readonly');
        //     original.hasAttribute('readonly') ? money.removeAttribute('readonly') : money.setAttribute('readonly','true'); 
        //     original.hasAttribute('readonly') ? original.value = null : original.value = 1;
        //     money.hasAttribute('readonly') ? money.value = null : money.value = 1;

        //     original.hasAttribute('readonly') ? original.setAttribute('type','text') : original.setAttribute('type','number');
        //     money.hasAttribute('readonly') ? money.setAttribute('type','text') : money.setAttribute('type','number');
            
        //     money.focus();

        //     return;
        // }
        
        response.forEach(item => {
            const {current_price,id} = item;

            if (id === e.target.id) {

                document.addEventListener('keyup', e => {
                    if (!isNaN(e.key) || isNaN(e.key) || e.key === 'Backspace') {
                        if (currency.value === 'USD') {
                            let monedaUsd = (Math.fround(original.value * current_price)).toLocaleString('es',{maximumFractionDigits: 2});
                            money.value = monedaUsd;
                        }
                        if (currency.value === 'ARS') {
                            let monedaArs = (Math.fround((original.value * dolarBlue) * current_price)).toLocaleString('es',{maximumFractionDigits: 2})
                            money.value = monedaArs;
                        }
                    }
                })

                document.addEventListener('change', e => {
                    if (e.target.value === 'USD') {
                        let monedaUsd = (Math.fround(original.value * current_price)).toLocaleString('es',{maximumFractionDigits: 2})
                        money.value = monedaUsd;
                        original.focus();
                    }
                    if (e.target.value === 'ARS') {
                        let monedaArs = (Math.fround((original.value * dolarBlue) * current_price)).toLocaleString('es',{maximumFractionDigits: 2})
                        money.value = monedaArs;
                        original.focus();
                    }
                })

                return;
            }
        })
        
    })

    // Buscador
    document.addEventListener('keyup', e => {
        response.forEach(item => {
            const {name,image,symbol,id} = item;

            getCripto.textContent = "";
            if ((name.toLowerCase().startsWith(searcher.value.toLowerCase()) && searcher.value !== '') || (name.toLowerCase().startsWith(searcherDesktop.value.toLowerCase()) && searcherDesktop.value !== '')) {
                const clone = templateGetCripto.cloneNode(true);

                clone.querySelector(".flex").id = id;
                clone.querySelector(".flex img").id = id;
                clone.querySelector(".flex p").id = id;
                clone.querySelector(".flex span").id = id;

                clone.querySelector(".flex img").src = image;
                clone.querySelector(".flex p").innerText = name;
                clone.querySelector(".flex span").innerText = symbol;

                fragmentGetCripto.appendChild(clone);
            } 
        })

        if (searcher.value === '' && e.key === 'Backspace') {
            getCripto.textContent = "";
        } 
        getCripto.appendChild(fragmentGetCripto);



    })

    // SliderUp
    document.addEventListener("scroll", e => {
        const slide = document.querySelector(".slideUp");
        window.scrollY > 500 ? slide.style.display = "block" : slide.style.display = 'none';
    })
}

// Barra de navegacion
const nav = document.getElementById('nav');
const openNavButton = document.getElementById('bars');

let openedNav = false;

openNavButton.addEventListener("click",(e) => {
    if (!openedNav) {
        nav.style.animation= "aparecer 1s forwards";
        openedNav = true;      
    } else {
        nav.style.animation = "desaparecer 1s forwards";
        openedNav = false;
    }
}) 

// Top 10 y mas criptos
document.addEventListener('click', e => {
    if (e.target.innerText === 'Top 10') {
        const fragmentTop10 = document.createDocumentFragment();
        containerTop10.textContent = '';

        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
            .then(data => data.json())
            .then(response => {
                
                response.forEach(item => {
                    const {name,current_price,image,price_change_percentage_24h,id} = item;
                    
                    const clone = templateTop10.cloneNode(true);    
                    
                    clone.querySelector(".cardChangesCripto").id = id;
                    clone.querySelector(".cardChangesCripto .changesCriptoName").id = id;
                    clone.querySelector(".cardChangesCripto img").id = id;
                    clone.querySelector(".cardChangesCripto .changesCriptoPrice").id = id;
                    clone.querySelector(".cardChangesCripto .changesCriptoChange").id = id;    
                    
                    clone.querySelector(".cardChangesCripto .changesCriptoName").innerText = name;
                    clone.querySelector(".cardChangesCripto img").src = image;
                    clone.querySelector(".cardChangesCripto .changesCriptoPrice").innerText = `$ ${current_price.toLocaleString('es',{ maximumFractionDigits: 8 })}`;
                    clone.querySelector(".cardChangesCripto .changesCriptoChange").innerText = `${price_change_percentage_24h.toLocaleString('es',{ maximumFractionDigits: 2 })}%`;

                    let conditional = clone.querySelector(".cardChangesCripto .changesCriptoChange").innerText;
                    let verify = clone.querySelector(".cardChangesCripto .changesCriptoChange");
                    let secondVerify = clone.querySelector(".cardChangesCripto");

                    conditional > "0" ? verify.classList.add("green") : verify.classList.add("red");
                    conditional > "0" ? verify.classList.add("fa-solid","fa-caret-up") : verify.classList.add("fa-solid","fa-caret-down");
                    conditional > "0" ? secondVerify.classList.add("outlineGreen") : secondVerify.classList.add("outlineRed");
    
                    fragmentTop10.appendChild(clone);
                })
                main.querySelector("h2").textContent = '';
                changesCripto.textContent = '';
                cardCripto.textContent = '';
                main.querySelector(".listCripto").style.display = 'block';
                main.querySelector(".listCripto").textContent = 'Top 10 Criptomonedas por capitalización de mercado';
                main.querySelector(".listCripto").id = 'lista';
                containerTop10.appendChild(fragmentTop10);
                main.appendChild(containerTop10);
                
            });
    }
    if (e.target.innerText === 'Mas criptos') {
        cardCripto.textContent = '';
        changesCripto.textContent = '';
        containerTop10.textContent = '';
        main.querySelector('h2').textContent = 'Criptomonedas con mayores cambios % en las ultimas 24hs';
        main.querySelector(".listCripto").textContent = 'Lista de criptomonedas';
        main.querySelector(".listCripto").style.display = 'block'; 
        getData(100);
    }
})

getData(50);