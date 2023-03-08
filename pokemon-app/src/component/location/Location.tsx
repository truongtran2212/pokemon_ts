import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ILocation, Pokemon } from "../../interface";
import "./location.css";
import PokemonList2 from "../character/PokemonList2";

interface Locations {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  isOpened: boolean;
}

const LocationDetail = (props: any) => {
  const { name, id, areas, viewDetail, setDetail } = props;
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
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {areas?.map((area: any) => {
                return <div className=""> {area.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
        </section>
      )}
    </div>
  );
};

const LocationCollection = (props: any) => {
  const { locationList, viewDetail, setDetail } = props;
  const selectLocation = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };
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
        {locationList.map((location: any) => {
          return (
            <div onClick={() => selectLocation(location.id)}>
              <LocationDetail
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={location.id}
                name={location.name}
                id={location.id}
                areas={location.areas}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

function Location() {
  const [locationList, setLocationList] = useState<ILocation[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenPlayer1, setIsopenPlayer1] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  
  return (
    <>
      <div className="custom-background">
        <div className="container">
          <Link to="/" style={{ color: "white" }}>
            Back to PokemonList
          </Link>
          {/* <LocationCollection
            locationList={locationList}
            viewDetail={viewDetail}
            setDetail={setDetail}
          />
          {!viewDetail.isOpened && (
            <div className="btn">
              <button onClick={nextPage}>
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )} */}

          <section className="pokemon-list-detailed1">
            <div className="detail-container">
              <Link to="/listPoke">
                <PlusCircleOutlined style={{ fontSize: 100, color: "gray" }} />
              </Link>
              {/* <h1 className="detail-close" onClick={closeDetail}>
                X
              </h1>
              <h1 className="detail-name">
                {poke === undefined ? null : poke.name}
              </h1>
              <div className="detail-info">
                <img
                  src={poke === undefined ? null : poke.sprites.front_default}
                  alt="pokemon"
                  className="detail-img"
                  style={{ height: 210 }}
                />
              </div> */}
            </div>
          </section>
          <section className="pokemon-list-detailed2">
            <div className="detail-container">
              <Link to="/">
                {" "}
                <PlusCircleOutlined style={{ fontSize: 100, color: "gray" }} />
              </Link>
              {/* <h1 className="detail-close" onClick={closeDetail}>
                X
              </h1>
              <h1 className="detail-name">
                {poke === undefined ? null : poke.name}
              </h1>
              <div className="detail-info">
                <img
                  src={poke === undefined ? null : poke.sprites.front_default}
                  alt="pokemon"
                  className="detail-img"
                  style={{ height: 210 }}
                />
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Location;
