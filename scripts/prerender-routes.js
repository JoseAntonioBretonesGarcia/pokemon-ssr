/* Here we are creating a routes.txt file with all the routes to be prerendered in build time */
(async () => {
  const fs = require("fs");

  const TOTAL_POKEMONS_PRERENDERED = 150; /* Numbers of pokemons details prerendered from pokemon with id 1 to this value*/
  const TOTAL_PAGES_PRERENDERED = 10; /* Numbers of Pokemons pages to be prerendered */

  const pagesIds = Array.from(Array(TOTAL_PAGES_PRERENDERED), (_, i) => i + 1);
  const PokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS_PRERENDERED}`
  ).then((res) => res.json());
  let fileContent = PokemonNameList.results
    .map((pokemon) => `/pokemons/${pokemon.name}`)
    .join("\n");
  fileContent += "\n";
  fileContent += pagesIds.map((id) => `/pokemons/page/${id}`).join("\n");
  fs.writeFileSync("routes.txt", fileContent);

  console.log("Routes file created successfully!");
})();
