import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ILocation } from "../../interface";

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
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  const getLocationList = async () => {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/location?limit=20&offset=20"
    );
    setNextUrl(res.data.next);
    res.data.result.forEach(async (location: Locations) => {
      const locat = await axios.get(
        `https://pokeapi.co/api/v2/location/${location.name}`
      );
      setLocationList((loca) => [...loca, locat.data]);
      setLoading(false);
    });
  };

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (location: Locations) => {
      const loca = await axios.get(
        `https://pokeapi.co/api/v2/location/${location.name}`
      );
      setLocationList((p) => [...p, loca.data]);
      setLoading(false);
    });
    console.log(locationList);
  };

  useEffect(() => {
    getLocationList();
  }, []);

  return (
    <>
      <div className="custom-background">
        <div className="container">
          <header className="pokemon-header"> Pokemon</header>
          <Link to="/" style={{ color: "white" }}>
            Back to PokemonList
          </Link>
          <LocationCollection
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
          )}
        </div>
      </div>
    </>
  );
}

export default Location;
