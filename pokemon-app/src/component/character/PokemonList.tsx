import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pokemon, IPokemonDetail } from "../../interface";
import "./pokemon.css";

interface DetailPoke {
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}

const PokemonDetail: React.FC<DetailPoke> = (props) => {
  const { name, id, image, abilities, viewDetail, setDetail } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div className="">
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="pokemon-list-container">
            <p className="pokemon-name"> {name} </p>
            <img src={image} alt="pokemon" />
          </section>
          <img src="skill_1.png" style={{height: 60, width: 60}} alt="pokemon" className="detail-img" />
          <img src="skill_2.png" style={{height: 100, width: 100}} alt="pokemon" className="detail-img" />
          <img src="skill_3.png" alt="pokemon" className="detail-img" />
        </>
      )}
    </div>
  );
};

interface Props {
  pokemons: IPokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  console.log(pokemons);
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <div onClick={() => selectPokemon(pokemon.id)}>
              <PokemonDetail
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
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
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
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
      console.log(pokemons);
    });
    console.log(nextUrl);
    console.log(res);
  };

  return (
    <>
      <Link to="/location" style={{ color: "white" }}>
        To Location
      </Link>
      <div className="App">
        <div className="container">
          <header className="pokemon-header"> Pokemon</header>

          <PokemonCollection
            pokemons={pokemons}
            viewDetail={viewDetail}
            setDetail={setDetail}
          />
          {!viewDetail.isOpened && (
            <div className="btn">
              <button onClick={nextPage}>
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
