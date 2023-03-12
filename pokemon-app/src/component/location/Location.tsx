import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./location.css";
import { Button } from "antd";


function Location() {
  const [hpPlayer1, setHpPlayer1] = useState<number>(100);
  const [hpPlayer2, setHpPlayer2] = useState<number>(100);
  var player1: any = localStorage.getItem("player1")
    ? JSON.parse(localStorage.player1)
    : null;
  var player2: any = localStorage.getItem("player2")
    ? JSON.parse(localStorage.player2)
    : null;

  const fightP2 = () => {
    setHpPlayer1(hpPlayer1 - (Math.floor(Math.random() * 20) + 10));
  };
  const fightP1 = () => {
    setHpPlayer2(hpPlayer2 - (Math.floor(Math.random() * 20) + 10));
  };

  useEffect(() => {
    if (hpPlayer1 <= 0) {
      setHpPlayer1(0);
      localStorage.removeItem("player1");
    }
  }, [hpPlayer1]);

  useEffect(() => {
    if (hpPlayer2 <= 0) {
      setHpPlayer2(0);
      localStorage.removeItem("player2");
    }
  }, [hpPlayer2]);

  return (
    <>
      <div className="custom-background">
        <div className="container1">
          <Link to="/" style={{ color: "white" }}>
            Back to PokemonList
          </Link>

          <section
            className="pokemon-player1"
            style={{ backgroundColor: player1 ? "rgba(0,0,0,0)" : "#f4f1de" }}
          >
            {!player1 ? (
              <div className="detail-container">
                <Link to="/choosePlayer1">
                  <PlusCircleOutlined
                    style={{ fontSize: 100, color: "gray" }}
                  />
                </Link>
              </div>
            ) : (
              <>
                <div className="detail-player">
                  {!player1 ? (
                    <Link to="/choosePlayer1">
                      <PlusCircleOutlined
                        style={{ fontSize: 100, color: "gray" }}
                      />
                    </Link>
                  ) : (
                    <>
                      <div style={{ display: "flex" }}>
                        <div>
                          <div className="meter animate">
                            <span
                              style={{
                                width: `${hpPlayer1}%`,
                                borderRadius: 25,
                                backgroundColor:
                                  hpPlayer1 <= 30
                                    ? "red"
                                    : hpPlayer1 <= 65
                                    ? "rgb(225, 235, 39)"
                                    : "rgb(43, 194, 83)",
                              }}
                            >
                              <span></span>
                            </span>
                          </div>
                          <h1 className="detail-name" style={{fontWeight: 500, color: "#fff"}}>{player1.name}</h1>
                          <div className="">
                            <img
                              src={player1.sprites.front_default}
                              // src={player1.sprites.other.home.front_default}
                              // src={player1.sprites.other.home.front_shiny}
                              alt="pokemon"
                              className="detail-img"
                              style={{ height: 150, width: 230 }}
                            />
                          </div>
                        </div>
                        {hpPlayer1 > 0 ? (
                          <div style={{ margin: "auto" }}>
                            <Button
                              onClick={fightP1}
                              style={{
                                borderRadius: "100%",
                                height: 100,
                                width: 100,
                                marginRight: 20,
                              }}
                            >
                              <img
                                src="multimedia.png"
                                className="fight-icon"
                                alt=""
                              />
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </section>
          {hpPlayer2 === 0 ? <NotificationPlayer2 /> : null}

          <section
            className="pokemon-player2"
            style={{ backgroundColor: player2 ? "rgba(0,0,0,0)" : "#f4f1de" }}
          >
            {!player2 ? (
              <div className="detail-container">
                <Link to="/choosePlayer2">
                  <PlusCircleOutlined
                    style={{ fontSize: 100, color: "gray" }}
                  />
                </Link>
              </div>
            ) : (
              <div className="detail-player">
                {!player2 ? (
                  <Link to="/choosePlayer2">
                    <PlusCircleOutlined
                      style={{ fontSize: 100, color: "gray" }}
                    />
                  </Link>
                ) : (
                  <>
                    <div style={{ display: "flex" }}>
                      {hpPlayer2 > 0 ? (
                        <div style={{ margin: "auto" }}>
                          <Button
                            onClick={fightP2}
                            style={{
                              borderRadius: "100%",
                              height: 100,
                              width: 100,
                              marginRight: 20,
                            }}
                          >
                            <img
                              src="multimedia.png"
                              className="fight-icon"
                              alt=""
                            />
                          </Button>
                        </div>
                      ) : null}
                      <div>
                        <div className="meter animate">
                          <span
                            style={{
                              width: `${hpPlayer2}%`,
                              borderRadius: 25,
                              backgroundColor:
                                hpPlayer2 <= 30
                                  ? "red"
                                  : hpPlayer2 <= 65
                                  ? "rgb(225, 235, 39)"
                                  : "rgb(43, 194, 83)",
                            }}
                          >
                            <span></span>
                          </span>
                        </div>
                        <h1 className="detail-name" style={{fontWeight: 500, color: "#fff"}}>{player2.name}</h1>
                        <div className="">
                          <img
                            src={player2.sprites.back_default}
                            alt="pokemon"
                            className="detail-img"
                            style={{ height: 210 }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
          {hpPlayer1 === 0 ? <NotificationPlayer1 /> : null}
        </div>
      </div>
    </>
  );
}

const NotificationPlayer1 = () => {
  return (
    <>
      <div
        style={{
          height: 80,
          width: 200,
          backgroundColor: "white",
          marginTop: "28%",
          marginRight: "25%",
          borderRadius: 30,
          display: "flex",
          opacity: 0.9,
          fontFamily: "Verdana",
          border: "2px solid blue",
          boxShadow: "5px 5px 5px #888",
        }}
      >
        <h3 style={{ margin: "auto" }}>TUỔI L**</h3>
      </div>
    </>
  );
};

const NotificationPlayer2 = () => {
  return (
    <>
      <div
        style={{
          height: 80,
          width: 200,
          backgroundColor: "white",
          marginTop: "2%",
          marginLeft: "31%",
          borderRadius: 30,
          display: "flex",
          opacity: 0.9,
          fontFamily: "Verdana",
          border: "2px solid blue",
          boxShadow: "5px 5px 5px #888",
        }}
      >
        <h3 style={{ margin: "auto" }}>Đ** ĐỦ TUỔI</h3>
      </div>
    </>
  );
};

export default Location;
