import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./location.css";
import { Button, Col, Row } from "antd";

function Location() {
  const [hpPlayer1, setHpPlayer1] = useState<number>(100);
  const [hpPlayer2, setHpPlayer2] = useState<number>(100);
  var team1: any = localStorage.getItem("team1")
    ? JSON.parse(localStorage.team1)
    : null;
  var team2: any = localStorage.getItem("team2")
    ? JSON.parse(localStorage.team2)
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

  useEffect(() => {
    console.log(team1);
  }, []);

  return (
    <>
      <div className="custom-background">
        <div className="container1">
          <section
            id="custom-back"
            className="pokemon-player1"
            style={{  border: "4px solid #EAE61A", opacity: 0.9}}
          >
            <Row style={{border: "2px solid #EAE61A", borderRadius: "12px 12px 0px 0px" }}>
              <Col span={5}>
                <button style={{ borderRadius: "100%", width: 50, height: 50 }}>
                  <img
                    style={{ width: 40, height: 40, cursor: "pointer" }}
                    src={team1[1].pokemon.sprites.other.home.front_default}
                    alt=""
                  />
                </button>
              </Col>
              <Col span={5}>
                <button style={{ borderRadius: "100%", width: 50, height: 50 }}>
                  <img
                    style={{ width: 40, height: 40, cursor: "pointer" }}
                    src={team1[2].pokemon.sprites.other.home.front_default}
                    alt=""
                  />
                </button>
              </Col>
            </Row>
            <div className="detail-player">
              <div>
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
                  <h1
                    className="detail-name"
                    style={{ fontWeight: 500, color: "#fff" }}
                  >
                    {team1.name}
                  </h1>
                  <div className="" style={{background: "#F9F3FE"}}>
                    <img
                      src={team1[0].pokemon.sprites.front_default}
                      // src={player1.sprites.other.home.front_default}
                      // src={player1.sprites.other.home.front_shiny}
                      alt="pokemon"
                      className="detail-img"
                      style={{ height: 150, width: 230 }}
                    />
                  </div>
                  <Row style={{border: "2px solid #EAE61A",borderRadius: "0px 0px 12px 12px"}}>
                      {team1[0].abilities.map((item: any) => (
                        <>
                        <Col span={1}></Col>
                        <Col span={5}>
                          <button
                            style={{
                              borderRadius: "100%",
                              width: 50,
                              height: 50,
                            }}
                          >
                            <img
                              style={{
                                width: 30,
                                height: 30,
                                cursor: "pointer",
                              }}
                              src={item.image}
                              alt=""
                            />
                          </button>
                        </Col>
                        </>
                      ))}
                    </Row>
                </div>
              </div>
            </div>
          </section>

          {hpPlayer2 === 0 ? <NotificationPlayer2 /> : null}

          <section
            className="pokemon-player2"
            style={{ backgroundColor: team2 ? "rgba(0,0,0,0)" : "#f4f1de" }}
          >
            <Row>
              <Col span={5}>
                <button style={{ borderRadius: "100%", width: 50, height: 50 }}>
                  <img
                    style={{ width: 40, height: 40, cursor: "pointer" }}
                    src={team2[1].pokemon.sprites.other.home.front_default}
                    alt=""
                  />
                </button>
              </Col>
              <Col span={5}>
                <button style={{ borderRadius: "100%", width: 50, height: 50 }}>
                  <img
                    style={{ width: 40, height: 40, cursor: "pointer" }}
                    src={team2[2].pokemon.sprites.other.home.front_default}
                    alt=""
                  />
                </button>
              </Col>
            </Row>
            <div className="detail-player">
              <div style={{ display: "flex" }}>
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
                  <h1
                    className="detail-name"
                    style={{ fontWeight: 500, color: "#fff" }}
                  >
                    {team2.name}
                  </h1>
                  <div className="">
                    <img
                      src={team2[0].pokemon.sprites.back_default}
                      alt="pokemon"
                      className="detail-img"
                      style={{ height: 210 }}
                    />
                    
                  </div>
                </div>
              </div>
            </div>
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
