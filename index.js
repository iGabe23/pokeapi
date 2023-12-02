"use strict";

// First try

const spinner = document.querySelector("#spinner");
const pokemonList = document.querySelector("#pokemonList");
const btnHeader = document.querySelectorAll(".btn-header");

let urlApi = `https://pokeapi.co/api/v2/pokemon/`;
let limit = 20;
let offset = 1;

function fetchPokemon(id) {
  const loading = document.querySelector(".loading");
  loading.classList.remove("dont-show");
  setTimeout(async () => {
    try {
      const res = await fetch(urlApi + id);
      data = await res.json(data.results, data.previous, data.next);
      showPokemon(data);
    } catch (error) {
      console.log(`Error fetching Pokemon : ${error.message}`);
    } finally {
      loading.classList.add("dont-show");
    }
  });
}

async function fetchPokemons(offset, limit) {
  removeChildNodes(pokemonList);
  const promises = [];
  for (let i = offset; i <= offset + limit; i++) {
    promises.push(fetchPokemon(i));
  }
  await Promise.all(promises);
}

function showPokemon(data) {
  // Desplegar los tipos de los pokemon que tienen mas de un tipo
  let types = data.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  types = types.join("");
  // Mostrar la ID de los pokemon con ceros delante
  let dataId = data.id.toString();
  if (dataId.length === 1) {
    dataId = "00" + dataId;
  } else if (dataId.length === 2) {
    dataId = "0" + dataId;
  }
  // Dividir el peso y la altura entre 10
  const height = (data.height / 10).toFixed(1);
  const weight = (data.weight / 10).toFixed(1);

  // Crear la carta de cada pokemon en orden y añadirla al HTML
  const card = document.createElement("div");
  card.classList.add("pokemon");
  card.innerHTML = `
    <div class="loading spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
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
        ${types}
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

btnHeader.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = offset; i <= offset + limit; i++) {
      fetch(urlApi + i)
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
