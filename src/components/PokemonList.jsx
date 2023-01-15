import { createResource, createSignal, For, Suspense } from "solid-js";
import { PokedexCard } from "./PokemonCard";

export const PokemonList = () => {
  const [url, setUrl] = createSignal("https://pokeapi.co/api/v2/pokemon/");
  const [previousUrl, setPreviousUrl] = createSignal("");
  const [nextUrl, setNextUrl] = createSignal("");

  const [pokemons] = createResource(url, async (url) => {
    const pokemonList = await fetch(url).then((res) => res.json());

    setPreviousUrl(pokemonList?.previous);
    setNextUrl(pokemonList?.next);

    const loadedPokemons = await Promise.all(
      pokemonList.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      )
    );

    return loadedPokemons;

    // return fetch("https://pokeapi.co/api/v2/pokemon/")
    //   .then((res) => res.json())
    //   .then((res) =>
    //     Promise.all(
    //       res.results.map((pokemon) =>
    //         fetch(pokemon.url).then((res) => res.json())
    //       )
    //     )
    //   );
  });
  return (
    <>
      <ul class="pokemon-list">
        <Suspense fallback={<p>Loading...</p>}>
          <For each={pokemons()}>
            {(item) => (
              <li>
                <PokedexCard pokemon={item} />
              </li>
            )}
          </For>
        </Suspense>
      </ul>
      <section class="pagination">
        <button
          class="pagination__button"
          disabled={!previousUrl()}
          onClick={() => setUrl(previousUrl())}
        >
          Prev
        </button>
        <button
          class="pagination__button"
          disabled={!nextUrl()}
          onClick={() => setUrl(nextUrl())}
        >
          Next
        </button>
      </section>
    </>
  );
};
