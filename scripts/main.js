import {fetchDataToScreen} from "./PokemonFunctions.js";
import {navBar} from "./navbar.js";

navBar(false);

window.addEventListener("onload", ()=>{
    
})



// cards--start
const section_card1 = document.querySelector(".section-card1");
const section_card2 = document.querySelector(".section-card2");
const section_card3 = document.querySelector(".section-card3");
// cards ---end
const buttonPrevius = document.querySelector(".prev");
const buttonNext = document.querySelector(".next");

let pokemonNumber=1; 

//show on screen fist time
fetchDataToScreen(section_card1, pokemonNumber);
pokemonNumber=pokemonNumber+6; //12
fetchDataToScreen(section_card2,pokemonNumber );
pokemonNumber=pokemonNumber+6; //18
fetchDataToScreen(section_card3, pokemonNumber );


// event listeners to  butons next and prev 
buttonPrevius.addEventListener("click", ()=>{

    if(pokemonNumber>=18){
        // Clean section
        section_card1.innerHTML="";
        section_card2.innerHTML="";
        section_card3.innerHTML="";
        //Add new elements
        pokemonNumber=pokemonNumber-30; //6
        fetchDataToScreen(section_card1, pokemonNumber);
        pokemonNumber=pokemonNumber+30-24;//12
        fetchDataToScreen(section_card2, pokemonNumber);
        pokemonNumber=pokemonNumber+24-18;//18
        fetchDataToScreen(section_card3, pokemonNumber);
    }
    
})

buttonNext.addEventListener("click", ()=>{

        // Clean section
        section_card1.innerHTML="";
        section_card2.innerHTML="";
        section_card3.innerHTML="";

    //Add new elements
    pokemonNumber=pokemonNumber+6; //24
    fetchDataToScreen(section_card1, pokemonNumber);
    pokemonNumber=pokemonNumber+6; //30
    fetchDataToScreen(section_card2, pokemonNumber);
    pokemonNumber=pokemonNumber+6; //36
    fetchDataToScreen(section_card3, pokemonNumber);


})



//////////////////////////////////navbarr