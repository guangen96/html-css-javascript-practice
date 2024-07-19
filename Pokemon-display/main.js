const baseApiUrl = "https://pokeapi.co/api/v2/";
const pokedexSelect = document.getElementById("pokedex-select");
const display = document.getElementById("display");
const noResultDisplay = document.getElementById("no-result");
const searchInput = document.getElementById("search-input");
const searchResultName = document.getElementById("search-result-name");
const imageDisplay = document.getElementById("search-result-image");
const baseStatsDisplay = document.getElementById("base-stats");
const typeDisplay = document.getElementById("type");

async function getPokedexList() {
  try {
    const pokedexApi = "pokedex/?limit=100";
    const fullPokedexApi = `${baseApiUrl}${pokedexApi}`;
    const response = await fetch(fullPokedexApi);
    const fullPokedexList = await response.json();

    fullPokedexList.results.forEach(function (value, index) {
      pokedexName = fullPokedexList.results[index].name;
      const newOption = document.createElement("option");
      newOption.value = pokedexName;
      newOption.innerHTML = pokedexName;
      pokedexSelect.appendChild(newOption);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Search Pokemon when user click enter or click submit */

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});

async function searchPokemon() {
  pokemonName = searchInput.value.toLowerCase();
  // check if search has input
  if (!pokemonName) {
    alert("Please input a search input");
    return;
  }
  // check if pokedex has input
  selectedPokedex = pokedexSelect.options[pokedexSelect.selectedIndex].text;
  if (selectedPokedex == "Select Pokedex") {
    alert("Please select pokedex");
    return;
  }
  try {
    const searchPokemonApi = `pokemon/${pokemonName}/`;
    const fullPokemonApi = `${baseApiUrl}${searchPokemonApi}`;
    const response = await fetch(fullPokemonApi);
    const fullPokemonInfo = await response.json();
    console.log(fullPokemonInfo);

    // check if pokemon is in pokedex
    if (selectedPokedex != "All") {
      let pokemonInPokedex = false;
      const checkPokedexApi = `pokemon-species/${pokemonName}`;
      const fullCheckPokedexApi = `${baseApiUrl}${checkPokedexApi}`;
      const response = await fetch(fullCheckPokedexApi);
      const fullPokedexList = await response.json();
      console.log(fullPokedexList);
      fullPokedexList.pokedex_numbers.forEach(function (value, index) {
        pokedexName = fullPokedexList.pokedex_numbers[index].pokedex.name;
        if (selectedPokedex == pokedexName) pokemonInPokedex = true;
      });
      if (!pokemonInPokedex) throw new Exception();
    }

    // Populate pokemon name
    searchResultName.innerHTML = `Name: ${pokemonName
      .charAt(0)
      .toUpperCase()}${pokemonName.slice(1)}`;

    // Get pokemon image
    pokemonImage = fullPokemonInfo.sprites.front_default;
    // display pokemon image
    imageDisplay.src = pokemonImage;

    // Get pokemon stats and type
    pokemonStatsList = fullPokemonInfo.stats;
    pokemonTypeList = fullPokemonInfo.types;
    // display stats
    baseStatsDisplay.innerHTML = "";
    pokemonStatsList.forEach(function (value, index) {
      const baseStat = document.createElement("p");
      baseStat.innerHTML = `${pokemonStatsList[index].stat.name}: ${pokemonStatsList[index].base_stat}`;
      baseStatsDisplay.appendChild(baseStat);
    });
    // display type
    typeDisplay.innerHTML = "";
    pokemonTypeList.forEach(function (value, index) {
      const type = document.createElement("p");
      type.innerHTML = `${pokemonTypeList[index].type.name}`;
      typeDisplay.appendChild(type);

      display.classList.remove("inactive");
      noResultDisplay.classList.add("inactive");
    });
  } catch (error) {
    console.error("pokemon not found ", error);
    display.classList.add("inactive");
    noResultDisplay.classList.remove("inactive");
  }
}
getPokedexList();
