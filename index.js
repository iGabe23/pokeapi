"use strict";
// Definir variables de HTML
const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__imagen");
const shinyBtn = document.querySelector(".btn-shiny");

const from = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const arrowPrev = document.querySelector(".arrow-prev");
const arrowNext = document.querySelector(".arrow-next");

let searchPokemon = 1;

// Función asíncorna en flecha para obtener los datos del API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// Funcion asincrona en flecha para pintar los datos de los pokemon
const renderPokemon = async (pokemon) => {
  //buscar los datos del pokemon

  pokemonName.innerHTML = `- Loading...`;

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = `- ${data.name}`;
    pokemonId.innerHTML = `#${data.id}`;
    pokemonImage.style.display = "block";
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = `- Not found :'(`;
    pokemonId.innerHTML = `#??`;
  }
  searchPokemon = data.id;
  //Escuchar evento shiny
  const shinyFn = async () => {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_shiny"
      ];
  };

  shinyBtn.addEventListener("click", shinyFn);
};

//Escuchar evento de input
from.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);

//Botones Prev Next
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

arrowPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
arrowNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

