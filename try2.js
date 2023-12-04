// Funcion para traer todo del API
async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url + id);
  const pokemon = await rest.json();
  pokemonCard(pokemon);
}

// Funcion con ciclo encargada de iterar los datos de los pokemon
async function drawPokemon() {
  for (let i = 1; i <= 20; i++) {
    await getPokemon(i);
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
