"use strict";

document.addEventListener("DOMContentLoaded", () => {
  fetchPokemon("https://pokeapi.co/api/v2/pokemon/");
});
let URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
const pokemonList = document.querySelector("#pokemonList");
let contador = 0;

// fetch pokemon by url and toggle spinner
function fetchPokemon(url) {
  setTimeout(async () => {
    try {
      switchSpinner();
      let data = await fetch(url);
      data = await data.json();
      showPokemon(
        data.results,
        data.types,
        data.previous,
        data.next,
        data.id,
        data.height,
        data.weight
      );
    } catch (error) {
      console.log(error);
    } finally {
      switchSpinner();
    }
  }, 1000);
}
// Spinner function
function switchSpinner() {
  const $spinner = document.getElementById("spinner");
  $spinner.classList.toggle("d-none");
}

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
  contador += 20;
  URL = `https://pokeapi.co/api/v2/pokemon?offset=${contador}&limit=20`;
  fetchPokemon();
  disable(contador);
});

// Set limit for pokemon
let limit = 20;
let offset = 1;
async function fetchPokemons(offset, limit) {
  removeChildNodes(pokemonList);
  const promises = [];
  for (let i = offset; i <= offset + limit; i++) {
    promises.push(fetchPokemon(i));
  }
  await Promise.all(promises);
}

function showPokemon(data) {
  // Dividir el peso y la altura entre 10
  const height = (data.height / 10).toFixed(1);
  const weight = (data.weight / 10).toFixed(1);

  // Desplegar los tipos de los pokemon que tienen mas de un tipo

  let pokemonTypes = data.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  pokemonTypes = pokemonTypes.join("");

  // Mostrar la ID de los pokemon con ceros delante
  let dataId = data.id.toString();
  if (dataId.length === 1) {
    dataId = "00" + dataId;
  } else if (dataId.length === 2) {
    dataId = "0" + dataId;
  }

  // Crear la carta de cada pokemon en orden y añadirla al HTML
  const card = document.createElement("div");
  card.classList.add("pokemon");
  card.innerHTML = `
    <p class="pokemon-id-back">#${dataId}</p>
    <div class="pokemon-image">
      <img
        src="${data.sprites.other.dream_world.front_default}"
        alt="${data.name}"
      />
    </div>
    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${dataId}</p>
        <h2 class="pokemon-name">${data.name}</h2>
      </div>
      <span class="pokemon-types">
        ${pokemonTypes}
      </span>
      <div class="pokemon-body">
        <p class="body">${height}m</p>
        <p class="body">${weight}kg</p>
      </div>
    </div>
    `;
  pokemonList.append(card);
}

// Hacer que los botones muestren los pokemon de cada tipo

const btnHeader = document.querySelectorAll(".btn-header");
btnHeader.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = offset; i <= offset + limit; i++) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + i)
        .then((res) => res.json())
        .then((data) => {
          if (btnId === "show-all") {
            showPokemon(data);
          } else {
            const types = data.types.map((type) => type.type.name);
            if (types.some((type) => type.includes(btnId))) {
              showPokemon(data);
            }
          }
        });
    }
  })
);

function disable(contador) {
  if (contador === 0) {
    previousBtn.setAttribute("disabled", "");
  } else {
    previousBtn.removeAttribute("disabled");
  }
}
disable(contador);
