import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon, IPokemonDetail } from "../../interface";
import "./pokemon.css";

// interface DetailPoke {
//   viewDetail: Detail;
//   setDetail: React.Dispatch<React.SetStateAction<Detail>>;
//   abilities:
//     | {
//         name: string;
//         ability: string;
//       }[]
//     | undefined;
//   name: string;
//   id: number;
//   image: string;
// }
interface DetailPoke {
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  id: number;
}

interface PokemonFight {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
  };
}

const PokemonDetail: React.FC<DetailPoke> = (props) => {
  const { id, detail, setDetail } = props;
  const [poke, setPoke] = useState<any>();
  const [pokeList, setPokeList] = useState<any[]>([]);
  let player1: any = JSON.parse(localStorage.player1);
  // useEffect(() => {
  //   console.log(id);
  //   console.log(detail);
  // }, [id]);

  const getDetailPoke = async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${detail.id}`
    );
    setPoke(res.data);
    setPokeList(res.data)
    localStorage.setItem("player1", JSON.stringify(res.data))
  };
  useEffect(() => {
      getDetailPoke();
  }, []);

  useEffect(() => {
    console.log(poke);
    console.log(pokeList)
  }, [poke]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false,
    });
  };

  return (
    <>
      {/* {console.log(poke)} */}
      {console.log(JSON.parse(localStorage.player1))}
      {console.log(player1.name)}
      <section className="pokemon-list-detailed">
        <div className="detail-container">
          <h1 className="detail-close" onClick={closeDetail}>
            X
          </h1>
          <h1 className="detail-name">
              {/* {poke.length === 0 ? null : poke[0].name} */}
              {poke === undefined ? null : poke.name}
            </h1>
          <div className="detail-info">
            <img
              src={poke === undefined ? null : poke.sprites.front_default}
              // src={poke.length === 0 ? null : poke[0].sprites.front_default}
              alt="pokemon"
              className="detail-img"
              style={{height: 210}}
            />

          </div>
        </div>
      </section>
    </>
  );
};

interface Props {
  pokemons: IPokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props;
  const [idPoke, setIdPoke] = useState<number>(detail.id);

  const selectPokemon = (id: number) => {
    setIdPoke(id);
    if (!detail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
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
          <PokemonDetail detail={detail} setDetail={setDetail} id={idPoke} />
        </div>
      )}
    </>
  );
};

interface Pokemons {
  name: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}

const PokemonList: React.FC = () => {
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
          ) : (
            <PokemonCollection
              pokemons={pokemons}
              detail={detail}
              setDetail={setDetail}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
