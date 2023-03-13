import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./location.css";
import { Button, Col, Row } from "antd";

function Location() {
  var team1: any = localStorage.getItem("team1")
    ? JSON.parse(localStorage.team1)
    : null;
  var team2: any = localStorage.getItem("team2")
    ? JSON.parse(localStorage.team2)
    : null;

  const [listTeam1, setListTeam1] = useState<any>(team1);
  const [listTeam2, setListTeam2] = useState<any>(team2);

  const [hpTeam1, setHpTeam1] = useState<number>(team1[0].hp);
  const [hpTeam2, setHpTeam2] = useState<number>(team2[0].hp);

  useEffect(() => {
    if (hpTeam2 <= 0) {
      setHpTeam2(0);
      listTeam2.shift();
      setListTeam2(listTeam2);
      setHpTeam2(100);
    }
    console.log(listTeam2);
  }, [hpTeam2]);

  useEffect(() => {
    if (hpTeam1 <= 0) {
      setHpTeam1(0);
      listTeam1.shift();
      setListTeam1(listTeam1);
      setHpTeam1(100);
    }
    console.log(listTeam1);
  }, [hpTeam1]);

  useEffect(() => {
    console.log(team1);
  }, []);

  const fight1 = (item: any) => {
    setHpTeam2(hpTeam2 - item.damage);
    setTeam1();
    console.log(item);
  };

  const fight2 = (item: any) => {
    setHpTeam1(hpTeam1 - item.damage);
  };

  const [luckyNumber, setLuckyNumber] = useState<number>(0);
  useEffect(() => {
    if (luckyNumber == 1) {
      setTimeout(setTeam1, 2000);
    }
    if (luckyNumber == 2) {
      setTimeout(setTeam2, 2000);
    }
  }, [luckyNumber]);

  const setTeam1 = () => {
    console.log("Team 1 đánh trước");
    console.log(listTeam1[0].abilities[Math.floor(Math.random()* 4)].damage);
    setHpTeam2(hpTeam2 - listTeam1[0].abilities[Math.floor(Math.random()* 4)].damage)
    setLuckyNumber(2);
  };
  const setTeam2 = () => {
    console.log("Team 2 đánh trước");
    setHpTeam1(hpTeam1 - listTeam2[0].abilities[Math.floor(Math.random()* 4)].damage)
    setLuckyNumber(1);
  };

  const start = () => {
    setLuckyNumber(Math.floor(Math.random() * 2) + 1);
  };
  

  return (
    <>
      <div className="custom-background">
        <div className="container1">
          <button
            type="button"
            onClick={start}
            style={{ height: 50, width: 100, cursor: "pointer" }}
          >
            Bắt đầu
          </button>

          <section
            // id="custom-back"
            className="pokemon-player1"
            style={{ border: "4px solid #EAE61A", opacity: 0.9 }}
          >
            <Row
              style={{
                border: "2px solid #EAE61A",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              <Col span={5}>
                {listTeam1[1] ? (
                  <button
                    style={{
                      borderRadius: "100%",
                      width: 50,
                      height: 45,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: 40, height: 40 }}
                      src={
                        listTeam1[1].pokemon.sprites.other.home.front_default
                      }
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "100%",
                      width: 50,
                      height: 45,
                      cursor: "pointer",
                    }}
                  ></button>
                )}
              </Col>

              <Col span={5}>
                {listTeam1[2] ? (
                  <button
                    style={{
                      borderRadius: "100%",
                      width: 50,
                      height: 45,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: 40, height: 40 }}
                      src={
                        listTeam1[2].pokemon.sprites.other.home.front_default
                      }
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "100%",
                      width: 50,
                      height: 45,
                      cursor: "pointer",
                    }}
                  ></button>
                )}
              </Col>
            </Row>
            <div className="detail-player">
              <div>
                <div>
                  <div className="meter animate">
                    <span
                      style={{
                        width: `${hpTeam1}%`,
                        borderRadius: 25,
                        backgroundColor:
                          hpTeam1 <= 30
                            ? "red"
                            : hpTeam1 <= 65
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
                  {listTeam1[0] ? (
                    <div className="">
                      <img
                        src={listTeam1[0].pokemon.sprites.front_default}
                        // src={player1.sprites.other.home.front_default}
                        // src={player1.sprites.other.home.front_shiny}
                        alt="pokemon"
                        className="detail-img"
                        style={{ height: 150, width: 230 }}
                      />
                    </div>
                  ) : null}

                  {listTeam1[0] ? (
                    <Row
                      style={{
                        border: "2px solid #EAE61A",
                        borderRadius: "0px 0px 12px 12px",
                      }}
                    >
                      {listTeam1[0].abilities.map((item: any) => (
                        <>
                          <Col span={1}></Col>
                          <Col span={5}>
                            <button
                              id="auto-click"
                              style={{
                                borderRadius: "100%",
                                width: 50,
                                height: 50,
                                cursor: "pointer",
                              }}
                              onClick={(e) => fight1(item)}
                            >
                              <img
                                style={{
                                  width: 30,
                                  height: 30,
                                }}
                                src={item.image}
                                alt=""
                              />
                            </button>
                          </Col>
                        </>
                      ))}
                    </Row>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          {hpTeam2 === 0 ? <NotificationPlayer2 /> : null}

          <section
            className="pokemon-player2"
            style={{ border: "4px solid #EAE61A", opacity: 0.9 }}
          >
            <Row
              style={{
                border: "2px solid #EAE61A",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              <Col span={5}>
                {listTeam2[1] ? (
                  <button
                    style={{ borderRadius: "100%", width: 50, height: 45 }}
                  >
                    <img
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                      src={
                        listTeam2[1].pokemon.sprites.other.home.front_default
                      }
                    />
                  </button>
                ) : (
                  <button
                    style={{ borderRadius: "100%", width: 50, height: 45 }}
                  ></button>
                )}
              </Col>

              <Col span={5}>
                {listTeam2[2] ? (
                  <button
                    style={{ borderRadius: "100%", width: 50, height: 45 }}
                  >
                    <img
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                      src={
                        listTeam2[2].pokemon.sprites.other.home.front_default
                      }
                    />
                  </button>
                ) : (
                  <button
                    style={{ borderRadius: "100%", width: 50, height: 45 }}
                  ></button>
                )}
              </Col>
            </Row>
            <div className="detail-player">
              <div>
                <div>
                  <div className="meter animate">
                    <span
                      style={{
                        width: `${hpTeam2}%`,
                        borderRadius: 25,
                        backgroundColor:
                          hpTeam2 <= 30
                            ? "red"
                            : hpTeam2 <= 65
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
                  {listTeam2[0] ? (
                    <div>
                      <img
                        src={listTeam2[0].pokemon.sprites.back_default}
                        alt="pokemon"
                        className="detail-img"
                        style={{ height: 150, width: 230 }}
                      />
                    </div>
                  ) : null}
                  {listTeam2[0] ? (
                    <Row
                      style={{
                        border: "2px solid #EAE61A",
                        borderRadius: "0px 0px 12px 12px",
                        marginTop: 20,
                      }}
                    >
                      {listTeam2[0].abilities.map((item: any) => (
                        <>
                          <Col span={1}></Col>
                          <Col span={5}>
                            <button
                              style={{
                                borderRadius: "100%",
                                width: 50,
                                height: 50,
                                cursor: "pointer",
                              }}
                              onClick={(e) => fight2(item)}
                            >
                              <img
                                style={{
                                  width: 30,
                                  height: 30,
                                }}
                                src={item.image}
                                alt=""
                              />
                            </button>
                          </Col>
                        </>
                      ))}
                    </Row>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
          {hpTeam1 === 0 ? <NotificationPlayer1 /> : null}
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
