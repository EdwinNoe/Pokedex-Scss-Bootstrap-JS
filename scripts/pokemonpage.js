import {navBar} from "./navbar.js";

navBar(true);

const js_image=document.querySelector(".js-image")
const js_text= document.querySelector(".card-text")
const js_title=document.querySelector(".card-title")

const js_type=document.querySelector(".js_type")
const js_index=document.querySelector(".js_index")
const js_weight=document.querySelector(".js_weight")
const js_height=document.querySelector(".js_height")
const js_sound=document.querySelector(".js_sound")

const js_stat=document.querySelector(".js_stat")


const PokemonSessionStorage= sessionStorage.getItem("pokemonSearch")

console.log(PokemonSessionStorage);

async function displayPokemon() {
    try{
        // First Fetch For image
        //put IMG //overview and stats
        let resp= await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonSessionStorage}`);
        if(!resp.ok){
            console.log(resp.status);
        }
        let data =await resp.json();
        //valiable values
        const type=data.types//<<--- contains an array of obj
        const img=data.sprites.other["official-artwork"].front_default;
        const index=sessionStorage.getItem("pokemonSearch");
        const weight= data.weight;
        const height=data.height;
        const sound=data.cries.latest

        const stats=data.stats;
        console.log(data.stats);

        //logic
        js_image.setAttribute("src", img);
        js_index.innerText=index
        js_weight.innerText=weight
        js_height.innerText=height
        js_sound.innerHTML=`<a href="${sound}"><img src="../assets/images/Sound.svg" alt=" sound"></a>`;
        
        type.forEach(Element=>{
            let pockemontext=document.createElement("span")
            pockemontext.innerText=` ${Element.type.name} `;
            js_type.appendChild(pockemontext);
        })

        stats.forEach((element)=>{
            let p=document.createElement("p");
            p.innerText=`${element.stat.name}: ${element.base_stat}`
            js_stat.append(p);
            // let textStat=`<p class="card-text">${element.stat.name}: <span>${element.base_stat}</span></p>`;
            // js_stat.innerHTML=textStat;
        })

        // second Fetch For general info
        resp= await fetch(`https://pokeapi.co/api/v2/pokemon-species/${PokemonSessionStorage}/`);
        if(!resp.ok){
            console.log("HTTPS Error:"+resp.status);
        }
        data= await resp.json()  
        //valiable values
        let cardText=data.flavor_text_entries[2].flavor_text;
        //logic
        cardText = cardText.replace(/\f/g, '').replace(/\n/g, ' ');
        js_text.innerText=`${cardText}`;
        js_title.innerText=`${data.name}`

        
    }catch(error){
        console.log(error);
    }
}

displayPokemon();