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

  const [listTeam1, setListTeam1] = useState<any>(team1 !== null ? team1 : []);
  const [listTeam2, setListTeam2] = useState<any>(team2 !== null ? team2 : []);

  const [hpTeam1, setHpTeam1] = useState<number>(
    team1 !== null ? team1[0].hp : 0
  );
  const [hpTeam2, setHpTeam2] = useState<number>(
    team2 !== null ? team2[0].hp : 0
  );
  const [reduceBloodTeam1, setReduceBloodTeam1] = useState<number>(0);
  const [reduceBloodTeam2, setReduceBloodTeam2] = useState<number>(0);

  const [luckyNumber, setLuckyNumber] = useState<number>(0);

  const [statusTeam1, setStatusTeam1] = useState<string>("Bình thường");
  const [statusTeam2, setStatusTeam2] = useState<string>("Bình thường");

  const [isCloseStart, setIsCloseStart] = useState<boolean>(false);

  // Team2 bị đánh
  useEffect(() => {
    if (hpTeam2 <= 0) {
      setHpTeam2(0);
      listTeam2.shift();
      setListTeam2(listTeam2);
      if (listTeam2.length > 0) {
        setHpTeam2(100);
        setStatusTeam2("Bình thường");
      }
      setReduceBloodTeam2(0);
    }
  }, [hpTeam2]);

  // Team1 bị đánh
  useEffect(() => {
    if (hpTeam1 <= 0) {
      setHpTeam1(0);
      listTeam1.shift();
      setListTeam1(listTeam1);
      if (listTeam1.length > 0) {
        setHpTeam1(100);
        setStatusTeam1("Bình thường");
      }
      setReduceBloodTeam1(0);
    }
  }, [hpTeam1]);

  // Bắt đầu trận đấu
  useEffect(() => {
    if (luckyNumber == 1) {
      setTimeout(team1Fight, 1500);
    }

    if (luckyNumber == 2) {
      setTimeout(team2Fight, 1500);
    }

    if (luckyNumber == 3) {
      setLuckyNumber(1);
    }

    if (luckyNumber == 4) {
      setLuckyNumber(2);
    }
  }, [luckyNumber]);

  // Team 1 bắt đầu đánh
  const team1Fight = () => {
    let skillRandom = listTeam1[0].abilities[Math.floor(Math.random() * 4)];
    let hp2 = skillRandom.damage;
    var skillName = skillRandom.name;
    if (skillName === "Đóng băng") {
      setHpTeam2(hpTeam2 - hp2);
      setReduceBloodTeam2(hp2);
      setLuckyNumber(3);
      console.log(skillRandom);
      setStatusTeam2("Choáng");
    }

    if (skillName !== "Đóng băng") {
      setHpTeam2(hpTeam2 - hp2);
      setReduceBloodTeam2(hp2);
      setLuckyNumber(2);
      setStatusTeam2("Bình thường");
    }
  };

  // Team 2 bắt đầu đánh
  const team2Fight = () => {
    let skillRandom = listTeam2[0].abilities[Math.floor(Math.random() * 4)];
    let hp1 = skillRandom.damage;
    var skillName = skillRandom.name;
    if (skillName === "Đóng băng") {
      setHpTeam1(hpTeam1 - hp1);
      setReduceBloodTeam1(hp1);
      setLuckyNumber(4);
      setStatusTeam1("Choáng");
      console.log(skillRandom);
    }
    if (skillName !== "Đóng băng") {
      setHpTeam1(hpTeam1 - hp1);
      setReduceBloodTeam1(hp1);
      setLuckyNumber(1);
      setStatusTeam1("Bình thường");
    }
  };

  const [number, setNumber] = useState<number>(4);
  useEffect(() => {
    if (number < 4 && number > -1) {
      start();
    }
  }, [number]);

  // Random số để chọn bên bắt đầu
  const start = () => {
    setIsCloseStart(true);
    setTimeout(start2, 1300);
    console.log(number);
    if (number == 0) {
      setLuckyNumber(Math.floor(Math.random() * 2) + 1);
    }
  };

  const start2 = () => {
    setNumber(number - 1);
    // setLuckyNumber(Math.floor(Math.random() * 2) + 1);
  };

  return (
    <>
      <div>
        <div>
          {listTeam1.length === 0 ? <GameOver /> : null}
          {listTeam2.length === 0 ? <GameOver /> : null}
          {number > 1 && number < 4 ? <CountDown /> : null}
          {number === 0 ? <Fight /> : null}
        </div>
        {/* <button onClick={test}>123</button> */}
        <div className="custom-background">
          <div
            className={
              listTeam1.length === 0 ||
              listTeam2.length === 0 ||
              (number < 4 && number > -1)
                ? "container1-custom"
                : "container1"
            }
          >
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
                      {/* {team1.name} */}
                    </h1>
                    {listTeam1[0] ? (
                      <div className="box2">
                        <div className="box">
                          {isCloseStart === true ? (
                            <p className="custom-hp">- {reduceBloodTeam1}</p>
                          ) : null}
                        </div>
                        {statusTeam1 === "Choáng" ? (
                          <div className="box">
                            <img
                              src="https://elwiki.net/wiki/images/1/1f/Status_Stunned.gif"
                              alt=""
                              width={50}
                              height={50}
                              style={{
                                marginTop: 10,
                                marginLeft: "180%",
                              }}
                            />
                          </div>
                        ) : null}
                        <div className="box">
                          <img
                            src={listTeam1[0].pokemon.sprites.front_default}
                            // src={player1.sprites.other.home.front_default}
                            // src={player1.sprites.other.home.front_shiny}
                            alt="pokemon"
                            className="detail-img box avatar"
                            style={{ height: 150, width: 230 }}
                          />
                        </div>
                      </div>
                    ) : null}

                    {listTeam1[0] ? (
                      <Row
                        style={{
                          border: "2px solid #EAE61A",
                          borderRadius: "0px 0px 12px 12px",
                          marginTop: 160,
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

            {isCloseStart === false ? (
              <img
                style={{
                  cursor: "pointer",
                  marginTop: "20%",
                  marginLeft: "4%",
                }}
                onClick={start}
                src="https://webusstatic.yo-star.com/mahjongsoul_us_web/mainsite/prod/assets/start_game_m.146ba275.png"
                alt=""
              />
            ) : null}

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
                      {/* {team2.name} */}
                    </h1>
                    {listTeam2[0] ? (
                      <div>
                        <p className="custom-hp">{reduceBloodTeam2}</p>
                        {/* <p className="custom-hp">{statusTeam2}</p> */}
                        {statusTeam2 === "Choáng" ? (
                          <div className="box">
                            <img
                              src="https://elwiki.net/wiki/images/1/1f/Status_Stunned.gif"
                              alt=""
                              width={50}
                              height={50}
                              style={{
                                marginTop: 10,
                                marginLeft: "180%",
                              }}
                            />
                          </div>
                        ) : null}
                        <div className="box">
                          <img
                            src={listTeam2[0].pokemon.sprites.back_default}
                            alt="pokemon"
                            className="detail-img"
                            style={{ height: 150, width: 230 }}
                          />
                        </div>
                      </div>
                    ) : null}
                    {listTeam2[0] ? (
                      <Row
                        style={{
                          border: "2px solid #EAE61A",
                          borderRadius: "0px 0px 12px 12px",
                          marginTop: 150,
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
            {/* {hpTeam1 === 0 ? <NotificationPlayer1 /> : null} */}
          </div>
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

const GameOver = () => {
  return (
    <>
      <div
        style={{
          height: 400,
          width: 800,
          backgroundColor: "rgb (0,0,0,0)",
          zIndex: 999,
          // marginTop: "20%",
          top: "50%",

          marginLeft: "55%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="https://cdn.staticcrate.com/stock-hd/effects/footagecrate-ko-style1@3X.png"
          alt=""
        />
      </div>
    </>
  );
};
const Fight = () => {
  return (
    <>
      <div
        style={{
          // height: 400,
          // width: 800,
          backgroundColor: "rgb (0,0,0,0)",
          zIndex: 999,
          // marginTop: "20%",
          top: "50%",

          marginLeft: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="https://cdn.staticcrate.com/stock-hd/effects/FootageCrate-3_2_1_FIGHT_Style_1-prev-full.png"
          alt=""
          width={1400}
        />
      </div>
    </>
  );
};
const CountDown = () => {
  return (
    <>
      <div
        style={{
          height: 400,
          width: 800,
          backgroundColor: "rgb (0,0,0,0)",
          zIndex: 999,
          // marginTop: "20%",
          top: "25%",

          marginLeft: "55%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          style={{ height: 800, width: 600 }}
          src="https://www.business2community.com/wp-content/uploads/2020/08/countdown.gif"
          alt=""
        />
      </div>
    </>
  );
};

export default Location;
