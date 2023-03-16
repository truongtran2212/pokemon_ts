import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./location.css";
import { Button, Col, Row } from "antd";

const Location: React.FC = () => {
  var team1: any = localStorage.getItem("team1")
    ? JSON.parse(localStorage.team1)
    : null;
  var team2: any = localStorage.getItem("team2")
    ? JSON.parse(localStorage.team2)
    : null;

  const [listTeam1, setListTeam1] = useState<any>(team1 !== null ? team1 : []);
  const [listTeam2, setListTeam2] = useState<any>(team2 !== null ? team2 : []);

  const [manaTeam1, setManaTeam1] = useState<number>(
    team1 !== null ? team1[0].mana : 0
  );
  const [manaTeam2, setManaTeam2] = useState<number>(
    team2 !== null ? team2[0].mana : 0
  );

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
      }
    }
  }, [hpTeam2]);

  // Team1 bị đánh
  useEffect(() => {
    if (hpTeam1 <= 0) {
      listTeam1.shift();
      setListTeam1(listTeam1);
      setReduceBloodTeam1(0);
      if (listTeam1.length > 0) {
        setHpTeam1(100);
      }
    }
  }, [hpTeam1]);

  // Bắt đầu trận đấu
  useEffect(() => {
    if (luckyNumber == 1) {
      setTimeout(team1Fight, 2000);
    }

    if (luckyNumber == 2) {
      setTimeout(team2Fight, 2000);
    }

    if (luckyNumber == 3) {
      setLuckyNumber(1);
    }

    if (luckyNumber == 4) {
      setLuckyNumber(2);
    }
  }, [luckyNumber]);

  // Team 1 bắt đầu đánh
  const [nameSkillTeam1, setNameSkillTeam1] = useState<string>("");

  const team1Fight = () => {
    setNameSkillTeam2("");
    let skillRandom = listTeam1[0].abilities[Math.floor(Math.random() * 4)];
    let hp2 = skillRandom.damage;
    let manaSkill = skillRandom.mana;
    let name = skillRandom.name;

    if (manaTeam1 >= manaSkill) {
      setNameSkillTeam1(name);
      if (name === "Đóng băng") {
        setHpTeam2(hpTeam2 - hp2);
        setManaTeam1(manaTeam1 - manaSkill);
        setReduceBloodTeam2(hp2);
        setLuckyNumber(3);
        setStatusTeam2("Choáng");
      }

      if (name !== "Đóng băng") {
        setHpTeam2(hpTeam2 - hp2);
        setManaTeam1(manaTeam1 - manaSkill);
        setReduceBloodTeam2(hp2);
        setLuckyNumber(2);
        setStatusTeam2("Bình thường");
      }
      if (hpTeam2 - hp2 <= 0) {
        setManaTeam2(100);
        setStatusTeam2("Bình thường");
        console.log(hpTeam2);
      }
    }

    if (manaTeam1 < manaSkill) {
      setNameSkillTeam1("");
      setHpTeam2(hpTeam2 - 9);
      setManaTeam1(manaTeam1 + (Math.floor(Math.random() * 10) + 5));
      setReduceBloodTeam2(9);
      setLuckyNumber(2);
      setStatusTeam2("Bình thường");
      if (hpTeam2 - 9 <= 0) {
        setManaTeam2(100);
        setStatusTeam2("Bình thường");
        console.log(hpTeam2);
      }
    }
  };

  // Team 2 bắt đầu đánh

  const [nameSkillTeam2, setNameSkillTeam2] = useState<string>("");

  const team2Fight = () => {
    setNameSkillTeam1("");
    let skillRandom = listTeam2[0].abilities[Math.floor(Math.random() * 4)];
    let hp1 = skillRandom.damage;
    let name = skillRandom.name;
    let manaSkill = skillRandom.mana;

    if (manaTeam2 >= manaSkill) {
      setNameSkillTeam2(name);

      if (name === "Đóng băng") {
        setHpTeam1(hpTeam1 - hp1);
        setManaTeam2(manaTeam2 - manaSkill);
        setReduceBloodTeam1(hp1);
        setLuckyNumber(4);
        setStatusTeam1("Choáng");
      }

      if (name !== "Đóng băng") {
        setHpTeam1(hpTeam1 - hp1);
        setManaTeam2(manaTeam2 - manaSkill);
        setReduceBloodTeam1(hp1);
        setLuckyNumber(1);
        setStatusTeam1("Bình thường");
      }
      if (hpTeam1 - hp1 <= 0) {
        setManaTeam1(100);
        setStatusTeam1("Bình thường");
      }
    }

    if (manaTeam2 < manaSkill) {
      setNameSkillTeam2("");

      setHpTeam1(hpTeam1 - 9);
      setManaTeam2(manaTeam2 + (Math.floor(Math.random() * 10) + 5));
      setReduceBloodTeam1(9);
      setLuckyNumber(1);
      setStatusTeam1("Bình thường");
      if (hpTeam1 - 9 <= 0) {
        setManaTeam1(100);
        setStatusTeam1("Bình thường");
      }
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
      {console.log(nameSkillTeam1)}
      <div>
        <div>
          {listTeam1.length === 0 ? <GameOver /> : null}
          {listTeam2.length === 0 ? <GameOver /> : null}
          {number > 1 && number < 4 ? <CountDown /> : null}
          {number === 0 ? <Fight /> : null}

          {nameSkillTeam1 === "Gió" ? <WindTeam1 /> : null}
          {nameSkillTeam1 === "Lửa" ? <FireTeam1 /> : null}
          {nameSkillTeam1 === "Đóng băng" ? <IceTeam1 /> : null}
          {nameSkillTeam1 === "Nước" ? <TsunamiTeam1 /> : null}
          {<ThunderTeam1 />}

          {nameSkillTeam2 === "Gió" ? <WindTeam2 /> : null}
          {nameSkillTeam2 === "Lửa" ? <FireTeam2 /> : null}
          {nameSkillTeam2 === "Đóng băng" ? <IceTeam2 /> : null}
          {nameSkillTeam2 === "Nước" ? <TsunamiTeam2 /> : null}
        </div>
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
                  <hr />
                  <hr />
                  <div className="meter animate blue">
                    <span
                      style={{
                        width: `${manaTeam1}%`,
                        borderRadius: 25,
                        // backgroundColor:
                        //   mnaa <= 30
                        //     ? "red"
                        //     : hpTeam1 <= 65
                        //     ? "rgb(225, 235, 39)"
                        //     : "rgb(43, 194, 83)",
                      }}
                    >
                      <span></span>
                    </span>
                  </div>
                  <hr />
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
                      {/* {isCloseStart === true ? ( */}
                      <p className="custom-hp">- {reduceBloodTeam1}</p>
                      {/* ) : null} */}
                    </div>
                    {statusTeam1 === "Choáng" ? (
                      <div className="box">
                        <img
                          src="https://i.pinimg.com/originals/03/a1/31/03a131545e7c893dcb2c13da1ffe728a.gif"
                          alt=""
                          width={70}
                          height={70}
                          style={{
                            marginTop: 10,
                            marginLeft: "50%",
                            zIndex: 10,
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="box">
                      <img
                        src={listTeam1[0].pokemon.sprites.front_default}
                        // src={listTeam1[0].pokemon.sprites.versions.generation}
                        // src={player1.sprites.other.home.front_default}
                        // src={player1.sprites.other.home.front_shiny}
                        alt="pokemon"
                        className="detail-img box avatar"
                        style={{ height: 200, width: 263 }}
                      />
                    </div>
                  </div>
                ) : null}

                {/* {listTeam1[0] ? (
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
                ) : null} */}
              </div>
            </section>
            {/* <NotificationPlayer2 skillNameTeam1={skillNameTeam1} /> */}
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
              // id="custom-back"
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
                          listTeam2[1].pokemon.sprites.other.home.front_default
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
                  {listTeam2[2] ? (
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
                          listTeam2[2].pokemon.sprites.other.home.front_default
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
                  <hr />
                  <hr />
                  <div className="meter animate blue">
                    <span
                      style={{
                        width: `${manaTeam2}%`,
                        borderRadius: 25,
                        // backgroundColor:
                        //   mnaa <= 30
                        //     ? "red"
                        //     : hpTeam1 <= 65
                        //     ? "rgb(225, 235, 39)"
                        //     : "rgb(43, 194, 83)",
                      }}
                    >
                      <span></span>
                    </span>
                  </div>
                  <hr />
                </div>
                <h1
                  className="detail-name"
                  style={{ fontWeight: 500, color: "#fff" }}
                >
                  {/* {team1.name} */}
                </h1>
                {listTeam2[0] ? (
                  <div className="box2">
                    <div className="box">
                      {isCloseStart === true ? (
                        <p className="custom-hp">- {reduceBloodTeam2}</p>
                      ) : null}
                    </div>
                    {statusTeam2 === "Choáng" ? (
                      <div className="box">
                        <img
                          src="https://i.pinimg.com/originals/03/a1/31/03a131545e7c893dcb2c13da1ffe728a.gif"
                          alt=""
                          width={70}
                          height={70}
                          style={{
                            marginTop: 10,
                            marginLeft: "170%",
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="box">
                      <img
                        src={listTeam2[0].pokemon.sprites.back_default}
                        // src={listTeam1[0].pokemon.sprites.versions.generation}
                        // src={player1.sprites.other.home.front_default}
                        // src={player1.sprites.other.home.front_shiny}
                        alt="pokemon"
                        className="detail-img box avatar"
                        style={{ height: 200, width: 263 }}
                      />
                    </div>
                  </div>
                ) : null}

                {/* {listTeam1[0] ? (
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
                ) : null} */}
              </div>
            </section>
            {/* {hpTeam1 === 0 ? <NotificationPlayer1 /> : null} */}
            {/* <NotificationPlayer1 /> */}
          </div>
        </div>
      </div>
    </>
  );
};

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

interface NameSkill {
  skillNameTeam1: string;
}

const NotificationPlayer2: React.FC<NameSkill> = (props) => {
  const { skillNameTeam1 } = props;
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
        <h3 style={{ margin: "auto" }}>{skillNameTeam1}</h3>
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
          top: "35%",

          marginLeft: "62%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          style={{ height: 500, width: 400 }}
          src="https://www.business2community.com/wp-content/uploads/2020/08/countdown.gif"
          alt=""
        />
      </div>
    </>
  );
};
const WindTeam2 = () => {
  return (
    <>
      <div className={"team2"}>
        <img
          style={{ height: 150, width: 100 }}
          src="https://images.jifo.co/132225151_1664164887618.gif"
          alt=""
        />
      </div>
    </>
  );
};
const FireTeam2 = () => {
  return (
    <>
      <div className={"team2"}>
        <img
          // style={{ height: 150, width: 100, transform: "rotate(-45deg)" }}
          style={{ height: 150, width: 100, transform: "rotate(135deg)" }}
          src="https://orangemushroom.files.wordpress.com/2016/07/blazing-orbital-flame-effect.gif"
          alt=""
        />
      </div>
    </>
  );
};

const TsunamiTeam2 = () => {
  return (
    <>
      <div className="team2">
        <img
          style={{ height: 150, width: 100 }}
          src="https://png.pngtree.com/png-clipart/20230207/original/pngtree-big-wave-of-tsunami-sea-and-summer-png-image_8946949.png"
          alt=""
        />
      </div>
    </>
  );
};
const IceTeam2 = () => {
  return (
    <>
      <div className="team2-1">
        <img
          style={{ height: 700, width: 150 }}
          src="https://spadow.files.wordpress.com/2010/07/newcoldbeam-hit0.gif?w=584"
          alt=""
        />
      </div>
    </>
  );
};
const WindTeam1 = () => {
  return (
    <>
      <div className={"team1"}>
        <img
          style={{ height: 150, width: 100 }}
          src="https://images.jifo.co/132225151_1664164887618.gif"
          alt=""
        />
      </div>
    </>
  );
};
const FireTeam1 = () => {
  return (
    <>
      <div className={"team1"}>
        <img
          style={{ height: 150, width: 100, transform: "rotate(-45deg)" }}
          // style={{ height: 150, width: 100, transform: "rotate(135deg)" }}
          src="https://orangemushroom.files.wordpress.com/2016/07/blazing-orbital-flame-effect.gif"
          alt=""
        />
      </div>
    </>
  );
};

const TsunamiTeam1 = () => {
  return (
    <>
      <div className="team1">
        <img
          style={{ height: 150, width: 100 }}
          src="https://png.pngtree.com/png-clipart/20230207/original/pngtree-big-wave-of-tsunami-sea-and-summer-png-image_8946949.png"
          alt=""
        />
      </div>
    </>
  );
};

const ThunderTeam1 = () => {
  return (
    <>
      <div className="team1">
        <img
          style={{ height: 150, width: 100 }}
          src="https://www.animatedimages.org/data/media/41/animated-lightning-and-thunderbolt-image-0001.gif"
          alt=""
        />
      </div>
    </>
  );
};

const IceTeam1 = () => {
  return (
    <>
      <div className="team1-1">
        <img
          style={{ height: 700, width: 150 }}
          src="https://spadow.files.wordpress.com/2010/07/newcoldbeam-hit0.gif?w=584"
          alt=""
        />
      </div>
    </>
  );
};

export default Location;
