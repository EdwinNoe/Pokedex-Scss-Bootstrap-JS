

// export function fetchDataToScreen(Container, NumberToDisplayfrom){
//     for(let i=0; i<=5; i++){
//         let img;
//         let pokemonName;
//         let cardText;
//         // get and display information
//         fetch(`https://pokeapi.co/api/v2/pokemon/${NumberToDisplayfrom+i}/`).then(resp=>{
//             if(!resp.ok){
//                 console.log("error " + resp.status);
//             }
//             return  resp.json();
//         }).then(data=>{
//              img=data.sprites.other['official-artwork'].front_default;
//              pokemonName=data.name;
    
//                 fetch(`https://pokeapi.co/api/v2/pokemon-species/${NumberToDisplayfrom+i}/`)
//                 .then(resp=>{
//                     return resp.json();
//                 }).then(data=>{
//                     cardText=data.flavor_text_entries[2].flavor_text;
//                     cardText = cardText.replace(/\f/g, '').replace(/\n/g, ' ');
//                     fetch(`https://pokeapi.co/api/v2/pokemon/${NumberToDisplayfrom+i}/`)
//                     .then((resp)=>{
//                         return resp.json();
//                     }).then((data)=>{
//                         let index=data.game_indices[3].game_index;
//                         console.log(img);
//                         console.log(pokemonName);
//                         Container.insertAdjacentHTML("beforeend", `
//                             <div class="card m-2" style="width: 18rem;">
//                                 <img src="${img}" class="card-img-top" alt="${pokemonName}">
//                                 <div class="card-body">
//                                 <h5 class="card-title text-center">${pokemonName}</h5>
//                                 <p class="card-text">${cardText}</p>
//                                     <div class="text-center">
//                                         <a href="#" class="btn btn-primary">Add to my</a>
//                                         <h2>${index}</h2>
//                                     </div>
//                                 </div>
//                             </div>  
//                         `)
//                     })
//                 })
//             })
//     }
// }



// async await
export async function fetchDataToScreen(Container, NumberToDisplayfrom){
    try{
        for(let i=0; i<=5; i++){
            let img;
            let pokemonName;
            let cardText;
            //First fetch
            let response= await fetch(`https://pokeapi.co/api/v2/pokemon/${NumberToDisplayfrom+i}/`);
            if(!response.ok){
                console.log("HTTPS Error:"+response.status);
                continue;
            }
            let data = await response.json();
            img=data.sprites.other['official-artwork'].front_default;
            pokemonName=data.name;
            //Second fetch
            response= await fetch(`https://pokeapi.co/api/v2/pokemon-species/${NumberToDisplayfrom+i}/`);
            if(!response.ok){
                console.log("HTTPS Error:"+response.status);
                continue;
            }
            data= await response.json();
            cardText=data.flavor_text_entries[2].flavor_text;
            cardText = cardText.replace(/\f/g, '').replace(/\n/g, ' ');
            // Third fetch
            response= await fetch (`https://pokeapi.co/api/v2/pokemon/${NumberToDisplayfrom+i}/`);
            data= await response.json();
            //insert to Dom
            let index=data.game_indices[3].game_index;
            Container.insertAdjacentHTML("beforeend", `
                <div class="Cards card m-2" style="width: 18rem; cursor:pointer">
                    <img src="${img}" class="card-img-top" alt="${pokemonName}"> 
                    <div class="card-body">
                    <h5 class="card-title text-center">${pokemonName}</h5>
                     <!--<p class="card-text">${cardText}</p>-->
                        <div class="text-center">
                            <a href="#" class="btn btn-primary">Pokemon info</a>
                            <h2>${index}</h2>
                        </div>
                    </div>
                </div>  
            `)
        }
    }catch (error) {
        console.error("Error fetching data: ", error);
    }

    // set events listeners 

    let botons = document.querySelectorAll(".btn-primary");
    botons.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            let nextNumber=boton.nextElementSibling.innerText;

            sessionStorage.setItem("pokemonSearch", nextNumber)
            window.location.href="./pages/pokemonPage.html";
        });
    });

    //compa , ahora ingresa el nombre que esta en el div y tambien elnumero del pokemon en el session 

}