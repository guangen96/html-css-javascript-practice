const baseApiUrl = "https://pokeapi.co/api/v2/";
const pokedexSelect = document.getElementById("pokedex-select");

async function getPokedexList() {
  try {
    const pokedexApi = "pokedex/?limit=100";
    const fullPokedexApi = `${baseApiUrl}${pokedexApi}`;
    const response = await fetch(fullPokedexApi);
    const fullPokedexList = await response.json();

    const pokedexNameList = [];
    fullPokedexList.results.forEach(function (value, index) {
      pokedexName = fullPokedexList.results[index].name;
      const newOption = document.createElement("option");
      newOption.value = pokedexName;
      newOption.innerHTML = pokedexName;
      pokedexSelect.appendChild(newOption);

      // pokedexNameList.push(fullPokedexList.results[index].name);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function searchPokemon() {
  try {
    console.log("test");
    const searchPokemonApi = `pokemon/${pokemonId}/`;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchBerries() {
  try {
    const response = await fetch(apiUrl);
    const berries = await response.json();
    console.log(berries);
  } catch (error) {
    console.error("Error:", error);
  }
}

getPokedexList();
