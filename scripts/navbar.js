export async function navBar (page){
    
    const searchbar=document.querySelector(".searchbar");
    const jsboton=document.querySelector(".jsboton");
    const search_filter=document.querySelector(".search-filter");

    //close and display
    const xmark=document.querySelector(".xmark");
    const searchPopUp=document.querySelector(".search")

    xmark.addEventListener("click", ()=>{
        searchPopUp.classList.add("search-off")
    });



    let pokemons=[];// <---array de objetos 

    // for (let i=1; i<=Infinity; i++){
    //     try{
    //         let response= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`); 
    //         if (!response.ok){
    //             break;
    //         }
    //         let data=await response.json();
    //         let pokemonName=data.name;

    //         let index;
    //         if (data.game_indices[3] && data.game_indices[3].game_index !== undefined) {
    //             index = data.game_indices[3].game_index;
    //         } else {
    //             index = i;
    //         }



    //         let pokemon={
    //             index: `${index}`,
    //             name: `${pokemonName}`
    //         }
    //         pokemons.push(pokemon);
    //     }catch(error){
    //         console.log(error);
    //     };
    // }

    //better verso

    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2400`);
        if (response.ok) {
            let data = await response.json();
            pokemons = data.results.map((pokemon, index) => {
                return {
                    index: index + 1,
                    name: pokemon.name
                };
            });
        }
    } catch (error) {
        console.log(error);
    }


   


    searchbar.addEventListener("keyup", ()=>{
        searchPopUp.classList.remove("search-off");
        searchPopUp.classList.add("search-on");

        let textInSearchBar = searchbar.value.toLowerCase();

        let pokemonsFiltered = pokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(textInSearchBar);
        });


        search_filter.innerHTML = "";

        pokemonsFiltered.forEach(element => {
            let a= document.createElement("a");
            a.classList.add("search-filter-p")
            a.innerText=`${element.name}`
            
            search_filter.appendChild(a);

            a.addEventListener("click" , (e)=>{
                let name=e.target.innerText;
                let ArrayElement =pokemons.filter((element)=>
                   element.name.includes(name)
                )
                if (!page){
                    sessionStorage.setItem("pokemonSearch", ArrayElement[0].index);
                    a.setAttribute("href", "./pages/pokemonPage.html");
                }else {
                    sessionStorage.setItem("pokemonSearch", ArrayElement[0].index);
                    window.location.reload();
                }

            })
        });
    });
}