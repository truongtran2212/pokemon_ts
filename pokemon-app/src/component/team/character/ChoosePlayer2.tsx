import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Detail, IPokemonDetail, Pokemon } from "../../../interface";
import "./pokemon.css";

interface Props {
  pokemons: IPokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props;
  const selectPokemon = async (id: number) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    localStorage.setItem("player2", JSON.stringify(res.data));
    window.location.assign("http://localhost:3000");
    console.log("player2");
  };
  

  return (
    <>
      {detail.isOpened === false ? (
        <section className="collection-container">
          {pokemons.map((pokemon) => {
            return (
              <>
                <section
                  className="pokemon-list-container"
                  onClick={() => {
                    selectPokemon(pokemon.id);
                  }}
                >
                  <p className="pokemon-name"> {pokemon.name} </p>
                  <img src={pokemon.sprites.front_default} alt="pokemon" />
                </section>
              </>
            );
          })}
        </section>
      ) : (
        <div className="overlay custom-background">
          <Link to="/location"></Link>
        </div>
      )}
    </>
  );
};

interface Pokemons {
  name: string;
  url: string;
}

const ChoosePlayer2: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({ id: 0, isOpened: false });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="App">
        <div className="container">
          {detail.isOpened === false ? (
            <>
              <header className="pokemon-header"> Pokemon</header>
              <Link to="/location" style={{ color: "white" }}>
                To Location
              </Link>
              <PokemonCollection
                pokemons={pokemons}
                detail={detail}
                setDetail={setDetail}
              />
              {!detail.isOpened && (
                <div className="btn">
                  <button onClick={nextPage}>
                    {loading ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChoosePlayer2;
