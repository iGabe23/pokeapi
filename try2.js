//variables
// document.addEventListener("DOMContentLoaded", getPokemon);
const maxPokemon = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemon = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    // displayPokemons(allPokemon);
  });

// Funcion para traer todo del API
async function getPokemon(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon");
  }
  console.log(pokemon);
  /*
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  */
}

// Funcion con ciclo encargada de iterar los datos de los pokemon
/*

async function drawPokemon() {
  for (let i = 0; i <= 2; i++) {
    await getPokemon();
  }
}

// Funcion que pinta las cartas de cada pokemon en el HTML
function pokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  card.innerHTML = `
  <p class="pokemon-id-back">#${pokemon.id}</p>
    <div class="pokemon-image">
      <img
        src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}"
      />
    </div>
    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${pokemon.id}</p>
        <h2 class="pokemon-name">${pokemon.name}</h2>
      </div>
      <span class="pokemon-types">
        ${pokemon.types}
      </span>
      <div class="pokemon-body">
        <p class="body">${pokemon.height}m</p>
        <p class="body">${pokemon.weight}kg</p>
      </div>
    </div>`;
  pokemonList.append(card);
}
drawPokemon();
pokemonCard();
*/
