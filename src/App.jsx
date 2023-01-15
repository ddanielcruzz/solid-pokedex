import { createSignal, Show } from "solid-js";
import { PokemonList } from "./components/PokemonList";
import { PokemonById } from "./components/PokemonById";

import "./App.css";


function App() {
  const [tab, setTab] = createSignal("list");

  return (
    <div class="app">
      <header class="header">
        <section class="tabs">
          <button
            classList={{
              tabs__button: true,
              "tabs__button--active": tab() === "list",
            }}
            onClick={() => setTab("list")}
          >
            List
          </button>
          <button
            classList={{
              tabs__button: true,
              "tabs__button--active": tab() === "id",
            }}
            onClick={() => setTab("id")}
          >
            By Id
          </button>
        </section>
      </header>
      <Show when={tab() === "list"} fallback={<PokemonById />}>
        <PokemonList />
      </Show>
    </div>
  );
}

export default App;
