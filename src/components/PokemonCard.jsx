import { For } from "solid-js";

export const PokedexCard = (props) => {
  const firstType = () => props.pokemon.types[0].type;

  return (
    <article class={`pokemon-card pokemon-card--${firstType()?.name}`}>
      <h1>#{props.pokemon.id}</h1>
      <img
        class={`pokemon-card__image pokemon-card__image--${firstType()?.name}`}
        src={props.pokemon.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <p class="pokemon-card__name">{props.pokemon.name}</p>
      <ul class="pokemon-card__types">
        <For each={props.pokemon.types}>
          {(type) => {
            const typeName = type.type.name;
            return (
              <li class={`pokemon-card__type pokemon-card__type--${typeName}`}>
                {typeName}
              </li>
            );
          }}
        </For>
      </ul>
    </article>
  );
};
