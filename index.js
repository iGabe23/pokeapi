"use strict";

// New try

const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const pokemonList = document.querySelector("#pokemonList");
const btnHeader = document.querySelectorAll(".btn-header");

let urlApi = `https://pokeapi.co/api/v2/pokemon/`;
let limit = 20;
let offset = 1;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 21;
    removeChildNodes("pokemon");
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 21;
  removeChildNodes("pokemon");
  fetchPokemons(offset, limit);
});

function fetchPokemon() {
  const loading = document.querySelector(".loading");
  loading.classList.remove("dont-show");
  setTimeout(async () => {
    try {
      let res = await fetch(urlApi);
      data = await res.json();
      showPokemon(data);
    } catch (error) {
      console.log(`Error fetching Pokemon : ${error.message}`);
    } finally {
    }
  });
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function showPokemon(data) {
  let types = data.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  types = types.join("");

  let dataId = data.id.toString();
  if (dataId.length === 1) {
    dataId = "00" + dataId;
  } else if (dataId.length === 2) {
    dataId = "0" + dataId;
  }

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
      <div class="pokemon-types">
        ${types}
      </div>
      <div class="pokemon-body">
        <p class="body">${data.height}m</p>
        <p class="body">${data.weight}kg</p>
      </div>
    </div>
    `;
  pokemonList.append(card);
}

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

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
