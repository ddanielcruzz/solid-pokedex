import {
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from "solid-js";
import { PokedexCard } from "./PokemonCard";

export const PokemonById = () => {
  const [pokemonId, setPokemonId] = createSignal(null);
  const [pokemon] = createResource(pokemonId, async (id) => {        
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
      (res) => res.json()
    );

    return res;
  });

  return (
    <section class="pokemon-by-id">
      <input
        class="pokemon-by-id__input"
        type="number"
        placeholder="Type an id"
        onInput={(e) => {
          const value = e.target?.value || null;

          setPokemonId(value);
        }}
      />
      <section>
        <Suspense fallback={<p>Loading...</p>}>
          <Show when={pokemon() && pokemonId() !== null}>
            <PokedexCard pokemon={pokemon()} />
          </Show>
        </Suspense>
      </section>
    </section>
  );
};
