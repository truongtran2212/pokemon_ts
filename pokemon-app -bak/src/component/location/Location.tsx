import React, { useState, useEffect, useCallback } from "react";
import "./location.css";
import { Button, Col, Row, Tooltip } from "antd";
import { DatabaseOutlined, ForwardOutlined } from "@ant-design/icons";
import {useNavigate } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";

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

  const [speed, setSpeed] = useState(false);

  // Bắt đầu trận đấu
  useEffect(() => {
    if (luckyNumber === 1) {
      setTimeout(team1Fight, speed === true ? 1000 : 2000);
    }

    if (luckyNumber === 2) {
      setTimeout(team2Fight, speed === true ? 1000 : 2000);
    }

    if (luckyNumber === 3) {
      setLuckyNumber(1);
    }

    if (luckyNumber === 4) {
      setLuckyNumber(2);
    }
  }, [luckyNumber]);

  // Team 1 bắt đầu đánh
  const [nameSkillTeam1, setNameSkillTeam1] = useState<string>("");
  const [skillHistoryTeam1, setSkillHistoryTeam1] = useState<any>([]);
  const team1Fight = () => {
    setNameSkillTeam2("");
    let skillRandom = listTeam1[0].abilities[Math.floor(Math.random() * 4)];
    let damageSkill = skillRandom.damage;
    let manaSkill = skillRandom.mana;
    let nameSkill = skillRandom.name;
    setSkillHistoryTeam1([...skillHistoryTeam1, skillRandom]);

    if (manaTeam1 >= manaSkill) {
      setNameSkillTeam1(nameSkill);
      if (nameSkill === "Đóng băng") {
        setHpTeam2(hpTeam2 - damageSkill);
        setManaTeam1(manaTeam1 - manaSkill);
        setReduceBloodTeam2(damageSkill);
        if (hpTeam2 - damageSkill > 0) {
          setLuckyNumber(3);
          setStatusTeam2("Choáng");
        } else {
          setLuckyNumber(4);
          setStatusTeam2("Bình thường");
        }
      }

      if (nameSkill === "Hút mana") {
        if (manaTeam1 === 100 || manaTeam1 + damageSkill >= 100) {
          setManaTeam1(100);
          setManaTeam2(manaTeam2 - damageSkill);
          // đang phân vân có nên trừ mana của Team 1 không?
          setReduceBloodTeam2(damageSkill);
          setLuckyNumber(2);
          setStatusTeam2("Bình thường");
        } else {
          setManaTeam1(manaTeam1 + damageSkill);
          setManaTeam2(manaTeam2 - damageSkill);
          setReduceBloodTeam2(damageSkill);
          setLuckyNumber(2);
          setStatusTeam2("Bình thường");
        }
      }

      if (nameSkill === "Hút máu") {
        if (hpTeam1 === 100 || hpTeam1 + damageSkill >= 100) {
          setHpTeam1(100);
          setHpTeam2(hpTeam2 - damageSkill);
          setManaTeam1(manaTeam1 - manaSkill);
          setReduceBloodTeam2(damageSkill);
          setLuckyNumber(2);
          setStatusTeam2("Bình thường");
        } else {
          setHpTeam1(hpTeam1 + damageSkill);
          setHpTeam2(hpTeam2 - damageSkill);
          setManaTeam1(manaTeam1 - manaSkill);
          setReduceBloodTeam2(damageSkill);
          setLuckyNumber(2);
          setStatusTeam2("Bình thường");
        }
      }

      if (
        nameSkill !== "Đóng băng" &&
        nameSkill !== "Hút máu" &&
        nameSkill !== "Hút mana"
      ) {
        setHpTeam2(hpTeam2 - damageSkill);
        setManaTeam1(manaTeam1 - manaSkill);
        setReduceBloodTeam2(damageSkill);
        setLuckyNumber(2);
        setStatusTeam2("Bình thường");
      }

      if (hpTeam2 - damageSkill <= 0) {
        setStatusTeam2("Bình thường");
        listTeam2.shift();
        setListTeam2(listTeam2);
        setReduceBloodTeam2(0);
        if (listTeam2.length > 0) {
          setManaTeam2(100);
          setHpTeam2(100);
        }
        if (listTeam2.length === 0) {
          setManaTeam2(0);
          setHpTeam2(0);
        }
      }
    }

    if (manaTeam1 < manaSkill) {
      setNameSkillTeam1("Đánh thường");
      setHpTeam2(hpTeam2 - 9);
      setManaTeam1(manaTeam1 + 8); // Random mana  5 -> 15
      setReduceBloodTeam2(9);
      setLuckyNumber(2);
      setStatusTeam2("Bình thường");
      if (hpTeam2 - 9 <= 0) {
        setStatusTeam2("Bình thường");
        listTeam2.shift();
        setListTeam2(listTeam2);
        setReduceBloodTeam2(0);
        if (listTeam2.length > 0) {
          setManaTeam2(100);
          setHpTeam2(100);
        }
        if (listTeam2.length === 0) {
          setManaTeam2(0);
          setHpTeam2(0);
        }
      }
    }
  };

  // Team 2 bắt đầu đánh

  const [nameSkillTeam2, setNameSkillTeam2] = useState<string>("");
  const [skillHistoryTeam2, setSkillHistoryTeam2] = useState<any>([]);

  const team2Fight = () => {
    setNameSkillTeam1("");
    let skillRandom = listTeam2[0].abilities[Math.floor(Math.random() * 4)];
    let damageSkill = skillRandom.damage;
    let nameSkill = skillRandom.name;
    let manaSkill = skillRandom.mana;
    setSkillHistoryTeam2([...skillHistoryTeam2, skillRandom]);

    if (manaTeam2 >= manaSkill) {
      setNameSkillTeam2(nameSkill);

      if (nameSkill === "Đóng băng") {
        setHpTeam1(hpTeam1 - damageSkill);
        setManaTeam2(manaTeam2 - manaSkill);
        setReduceBloodTeam1(damageSkill);
        setLuckyNumber(4);
        if (hpTeam1 - damageSkill > 0) {
          setStatusTeam1("Choáng");
        } else {
          setLuckyNumber(3);
          setStatusTeam1("Bình thường");
        }
      }

      if (nameSkill === "Hút mana") {
        if (manaTeam2 === 100 || manaTeam2 + damageSkill >= 100) {
          setManaTeam2(100);
          setManaTeam1(manaTeam1 - damageSkill);
          // đang phân vân có nên trừ mana của Team 1 không?
          setReduceBloodTeam1(damageSkill);
          setLuckyNumber(1);
          setStatusTeam1("Bình thường");
        } else {
          setManaTeam2(manaTeam2 + damageSkill);
          setManaTeam1(manaTeam1 - damageSkill);
          setReduceBloodTeam1(damageSkill);
          setLuckyNumber(1);
          setStatusTeam1("Bình thường");
        }
      }

      if (nameSkill === "Hút máu") {
        if (hpTeam2 === 100 || hpTeam2 + damageSkill >= 100) {
          setHpTeam2(100);
          setHpTeam1(hpTeam1 - damageSkill);
          setManaTeam2(manaTeam2 - manaSkill);
          setReduceBloodTeam1(damageSkill);
          setLuckyNumber(1);
          setStatusTeam1("Bình thường");
        } else {
          setHpTeam2(hpTeam2 + damageSkill);
          setHpTeam1(hpTeam1 - damageSkill);
          setManaTeam2(manaTeam2 - manaSkill);
          setReduceBloodTeam1(damageSkill);
          setLuckyNumber(1);
          setStatusTeam1("Bình thường");
        }
      }

      if (
        nameSkill !== "Đóng băng" &&
        nameSkill !== "Hút máu" &&
        nameSkill !== "Hút mana"
      ) {
        setHpTeam1(hpTeam1 - damageSkill);
        setManaTeam2(manaTeam2 - manaSkill);
        setReduceBloodTeam1(damageSkill);
        setLuckyNumber(1);
        setStatusTeam1("Bình thường");
      }
      if (hpTeam1 - damageSkill <= 0) {
        setStatusTeam1("Bình thường");
        listTeam1.shift();
        setListTeam1(listTeam1);
        setReduceBloodTeam1(0);
        if (listTeam1.length > 0) {
          setManaTeam1(100);
          setHpTeam1(100);
        }
        if (listTeam1.length === 0) {
          setManaTeam1(0);
          setHpTeam1(0);
        }
      }
    }

    if (manaTeam2 < manaSkill) {
      setNameSkillTeam2("Đánh thường");
      setHpTeam1(hpTeam1 - 9);
      setManaTeam2(manaTeam2 + 8);
      setReduceBloodTeam1(9);
      setLuckyNumber(1);
      setStatusTeam1("Bình thường");
      if (hpTeam1 - 9 <= 0) {
        setStatusTeam1("Bình thường");
        listTeam1.shift();
        setListTeam1(listTeam1);
        setReduceBloodTeam1(0);
        if (listTeam1.length > 0) {
          setManaTeam1(100);
          setHpTeam1(100);
        }
        if (listTeam1.length === 0) {
          setManaTeam1(0);
          setHpTeam1(0);
        }
      }
    }
  };

  const [number, setNumber] = useState<number>(4);
  useEffect(() => {
    if (number < 4 && number > -1) {
      start();
    }
  }, [number]);

  const [luckyHistory, setLuckyHistory] = useState<number>(0);
  // Random số để chọn bên bắt đầu
  const start = () => {
    setIsCloseStart(true);
    setTimeout(start2, 1300);
    if (number === 0) {
      let lucky = Math.floor(Math.random() * 2) + 1;
      setLuckyHistory(lucky);
      setLuckyNumber(lucky);
    }
  };

  const start2 = () => {
    setNumber(number - 1);
  };
  const navigate = useNavigate();
  const backToListPokemon = useCallback(
    () => navigate("/pokemonList", { replace: true }),
    [navigate]
  );
  const toHistoryPage = useCallback(
    () => navigate("/history", { replace: true }),
    [navigate]
  );

  return (
    <>
      <div>
        <div>
          {listTeam1.length === 0 &&
          listTeam2.length === 0 ? null : listTeam1.length === 0 ? (
            <Team2Win
              skillHistoryTeam1={skillHistoryTeam1}
              skillHistoryTeam2={skillHistoryTeam2}
              luckyHistory={luckyHistory}
              listTeam1={team1}
              listTeam2={team2}
            />
          ) : listTeam2.length === 0 ? (
            <Team1Win
              skillHistoryTeam1={skillHistoryTeam1}
              skillHistoryTeam2={skillHistoryTeam2}
              luckyHistory={luckyHistory}
              listTeam1={team1}
              listTeam2={team2}
            />
          ) : null}
          {/* {listTeam2.length === 0 ? <GameOver /> : null} */}
          {number > 1 && number < 4 ? <CountDown /> : null}
          {/* {number === 0 && luckyNumber === 1 ? <Fight /> : null} */}

          {number === 0 && luckyNumber === 1 ? <Team1 /> : null}
          {number === 0 && luckyNumber === 2 ? <Team2 /> : null}

          {/* animation skill team1 */}
          {nameSkillTeam1 === "Gió" ? <WindSkillTeam1 /> : null}
          {nameSkillTeam1 === "Lửa" ? <FireSkillTeam1 /> : null}
          {nameSkillTeam1 === "Đóng băng" ? <IceSkillTeam1 /> : null}
          {nameSkillTeam1 === "Nước" ? <TsunamiSkillTeam1 /> : null}
          {nameSkillTeam1 === "Sấm sét" ? <ThunderSkillTeam1 /> : null}
          {nameSkillTeam1 === "Động đất" ? <RockSkillTeam1 /> : null}
          {nameSkillTeam1 === "Đánh thường" ? <AttackTeam1 /> : null}

          {/* animation skill team2 */}
          {nameSkillTeam2 === "Gió" ? <WindSkillTeam2 /> : null}
          {nameSkillTeam2 === "Lửa" ? <FireSkillTeam2 /> : null}
          {nameSkillTeam2 === "Đóng băng" ? <IceSkillTeam2 /> : null}
          {nameSkillTeam2 === "Nước" ? <TsunamiSkillTeam2 /> : null}
          {nameSkillTeam2 === "Sấm sét" ? <ThunderSkillTeam2 /> : null}
          {nameSkillTeam2 === "Động đất" ? <RockSkillTeam2 /> : null}
          {nameSkillTeam2 === "Đánh thường" ? <AttackTeam2 /> : null}
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
            <Row style={{ display: "flex", marginRight: "85%" }}>
              <Col span={12}>
                <Tooltip
                  placement="bottomRight"
                  color="#fff"
                  title={<span style={{ color: "black" }}>Quay về</span>}
                  arrow={false}
                >
                  <Button
                    className="btn-history"
                    style={{ width: 60, height: 60 }}
                    icon={
                      <UndoIcon
                        style={{ fontSize: 50, transform: "rotate(45deg)" }}
                      />
                    }
                    onClick={backToListPokemon}
                  ></Button>
                </Tooltip>
              </Col>
              <Col span={12}>
                <Tooltip
                  placement="bottomRight"
                  color="#fff"
                  title={<span style={{ color: "black" }}>Lịch sử đấu</span>}
                  arrow={false}
                >
                  <Button
                    className="btn-history"
                    style={{
                      marginLeft: "50%",
                      width: 60,
                      height: 60,
                    }}
                    icon={<DatabaseOutlined style={{ fontSize: 35 }} />}
                    onClick={toHistoryPage}
                  ></Button>
                </Tooltip>
              </Col>
            </Row>
            <section
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
                    >
                      <img
                        style={{ width: 35, height: 30 }}
                        src={
                          "https://cdn-icons-png.flaticon.com/512/65/65525.png"
                        }
                        alt=""
                      />
                    </button>
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
                    >
                      <img
                        style={{ width: 35, height: 30 }}
                        src={
                          "https://cdn-icons-png.flaticon.com/512/65/65525.png"
                        }
                        alt=""
                      />
                    </button>
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
                      {isCloseStart === true && reduceBloodTeam1 !== 0 ? (
                        nameSkillTeam1 === "Hút máu" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "green", fontSize: 24 }}
                          >
                            + {reduceBloodTeam2}
                          </p>
                        ) : nameSkillTeam1 === "Hút mana" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "blue", fontSize: 24 }}
                          >
                            + {reduceBloodTeam2}
                          </p>
                        ) : nameSkillTeam2 === "Hút mana" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "blue", fontSize: 24 }}
                          >
                            - {reduceBloodTeam1}
                          </p>
                        ) : (
                          <p
                            className="custom-hp"
                            style={{ color: "red", fontSize: 24 }}
                          >
                            - {reduceBloodTeam1}
                          </p>
                        )
                      ) : null}
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

            {isCloseStart === false ? (
              <img
                style={{
                  cursor: "pointer",
                  marginTop: "13%",
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
                    >
                      <img
                        style={{ width: 35, height: 30 }}
                        src={
                          "https://cdn-icons-png.flaticon.com/512/65/65525.png"
                        }
                        alt=""
                      />
                    </button>
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
                    >
                      <img
                        style={{ width: 35, height: 30 }}
                        src={
                          "https://cdn-icons-png.flaticon.com/512/65/65525.png"
                        }
                        alt=""
                      />
                    </button>
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
                      {isCloseStart === true && reduceBloodTeam2 !== 0 ? (
                        nameSkillTeam2 === "Hút máu" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "green", fontSize: 24 }}
                          >
                            + {reduceBloodTeam1}
                          </p>
                        ) : nameSkillTeam2 === "Hút mana" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "blue", fontSize: 24 }}
                          >
                            + {reduceBloodTeam1}
                          </p>
                        ) : nameSkillTeam1 === "Hút mana" ? (
                          <p
                            className="custom-hp"
                            style={{ color: "blue", fontSize: 24 }}
                          >
                            - {reduceBloodTeam2}
                          </p>
                        ) : (
                          <p
                            className="custom-hp"
                            style={{ color: "red", fontSize: 24 }}
                          >
                            - {reduceBloodTeam2}
                          </p>
                        )
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
              </div>


            </section>
            <Row className="row-faster">
                <Col span={5}>
                  <Button
                    className="btn-faster"
                    style={{
                      width: 80,
                      height: 70,
                    }}
                    icon={<ForwardOutlined style={{ fontSize: 50 }} />}
                    onClick={() => setSpeed(!speed)}
                  ></Button>
                </Col>
                <Col span={5} offset={4}>
                  <h1
                    style={{
                      fontSize: 60,
                      color: "#FFFF66",
                      marginTop: 10,
                    }}
                  >
                    {speed === true ? "x2" : null}
                  </h1>
                </Col>
              </Row>
          </div>
        </div>
      </div>
    </>
  );
};

// LocalStorage hay SessionStorage đều không đủ dung lượng
// Lỗi Failed to execute 'setItem' on 'Storage': Setting the value of 'history' exceeded the quota.

interface HistorySkill {
  skillHistoryTeam1: any;
  skillHistoryTeam2: any;
  luckyHistory: number;
  listTeam1: any;
  listTeam2: any;
}

const Team1Win: React.FC<HistorySkill> = (props) => {
  const {
    skillHistoryTeam1,
    skillHistoryTeam2,
    luckyHistory,
    listTeam1,
    listTeam2,
  } = props;

  const history = {
    skillHistoryTeam1,
    skillHistoryTeam2,
    luckyHistory,
    listTeam1,
    listTeam2,
  };
  // let lsHistory: any = sessionStorage.getItem("history")
  //   ? JSON.parse(sessionStorage.history)
  //   : null;

  // const [listHistory, setListHistory] = useState(
  //   lsHistory !== null ? lsHistory : []
  // );

  // useEffect(() => {
  //   if (lsHistory === null) {
  //     setListHistory([history]);
  //   } else {
  //     setListHistory([...listHistory, history]);
  //   }
  // }, []);
  // sessionStorage.setItem("history", JSON.stringify(listHistory));
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, []);

  return (
    <>
      <div className="game-over">
        <img
          src="image/player1.gif"
          alt=""
          width={600}
          height={200}
          style={{ borderRadius: 20 }}
        />
      </div>
    </>
  );
};

const Team2Win: React.FC<HistorySkill> = (props) => {
  const {
    skillHistoryTeam1,
    skillHistoryTeam2,
    luckyHistory,
    listTeam1,
    listTeam2,
  } = props;
  const history = {
    skillHistoryTeam1: skillHistoryTeam1,
    skillHistoryTeam2: skillHistoryTeam2,
    luckyHistory: luckyHistory,
    listTeam1: listTeam1,
    listTeam2: listTeam2,
  };

  // let lsHistory: any = localStorage.getItem("history")
  //   ? JSON.parse(localStorage.history)
  //   : null;

  // const [listHistory, setListHistory] = useState(
  //   lsHistory !== null ? lsHistory : []
  // );
  // useEffect(() => {
  //   if (lsHistory === null) {
  //     setListHistory([history]);
  //   } else {
  //     setListHistory([...listHistory, history]);
  //   }
  // }, []);
  // sessionStorage.setItem("history", JSON.stringify(listHistory));
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, []);

  return (
    <>
      <div className="game-over">
        <img
          src="image/player2.gif"
          alt=""
          width={600}
          height={200}
          style={{ borderRadius: 20 }}
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

const Team1 = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb (0,0,0,0)",
          zIndex: 999,
          top: "47%",
          marginLeft: "53%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="https://www.digitalscrapbook.com/sites/default/files/styles/456_scale/public/s3fs-user-content/graphic-image/user-2/node-62674/player-1-template-video-game-valentine-stamp-graphic-element-computer-pixels-games-teen-boy-love.png"
          alt=""
          width={700}
        />
      </div>
    </>
  );
};
const Team2 = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb (0,0,0,0)",
          zIndex: 999,
          top: "47%",
          marginLeft: "53%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src="https://www.digitalscrapbook.com/sites/default/files/styles/456_scale/public/s3fs-user-content/graphic-image/user-2/node-62675/player-2-template-video-game-valentine-stamp-graphic-element-computer-pixels-games-teen-boy-love.png"
          alt=""
          width={700}
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
      <audio autoPlay={true} src="audio/fight.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const IceSkillTeam1 = () => {
  return (
    <>
      <div className="team1-1">
        <img
          style={{ height: 700, width: 150 }}
          src="https://spadow.files.wordpress.com/2010/07/newcoldbeam-hit0.gif?w=584"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/freeze.mp3" typeof="audio/mp3"></audio>
    </>
  );
};
const IceSkillTeam2 = () => {
  return (
    <>
      <div className="team2-1">
        <img
          style={{ height: 700, width: 150 }}
          src="https://spadow.files.wordpress.com/2010/07/newcoldbeam-hit0.gif?w=584"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/freeze.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const WindSkillTeam1 = () => {
  return (
    <>
      <div className={"team1-skill"}>
        <img
          style={{ height: 200, width: 200 }}
          src="https://images.jifo.co/132225151_1664164887618.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/wind.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const WindSkillTeam2 = () => {
  return (
    <>
      <div className={"team2-skill"}>
        <img
          style={{ height: 200, width: 200 }}
          src="https://images.jifo.co/132225151_1664164887618.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/wind.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const RockSkillTeam1 = () => {
  return (
    <>
      <div className={"team1-skill"}>
        <img
          style={{ height: 200, width: 200 }}
          src="https://wiki.tuxemon.org/images/7/7d/Rockfall_193.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/stone.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const RockSkillTeam2 = () => {
  return (
    <>
      <div className={"team2-skill"}>
        <img
          style={{ height: 200, width: 200 }}
          src="https://wiki.tuxemon.org/images/7/7d/Rockfall_193.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/stone.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const AttackTeam1 = () => {
  return (
    <>
      <div className={"team2-attack"}>
        <img
          style={{ height: 200, width: 200 }}
          src="https://s3-eu-west-1.amazonaws.com/inspire.education.uploads/assets/media/scene/uploads/custom/1599320562_Chocolate_custom.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/punch.mp3" typeof="audio/mp3"></audio>
    </>
  );
};

const AttackTeam2 = () => {
  return (
    <>
      <div className={"team1-attack"}>
        <img
          style={{ height: 200, width: 200, marginLeft: 500 }}
          src="https://s3-eu-west-1.amazonaws.com/inspire.education.uploads/assets/media/scene/uploads/custom/1599320562_Chocolate_custom.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/punch.mp3" typeof="audio/wav"></audio>
    </>
  );
};

const FireSkillTeam1 = () => {
  return (
    <>
      <div className={"team1-skill"}>
        <img
          style={{ height: 200, width: 264 }}
          src="https://i2.wp.com/www.mustardseedbbq.com/wp-content/uploads/2016/02/Realistic-fire-animated-transparent-gif-short.gif?fit=480%2C272&ssl=1"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/fire.wav" typeof="audio/wav"></audio>
    </>
  );
};

const FireSkillTeam2 = () => {
  return (
    <>
      <div className={"team2-skill"}>
        <img
          style={{ height: 200, width: 264 }}
          src="https://i2.wp.com/www.mustardseedbbq.com/wp-content/uploads/2016/02/Realistic-fire-animated-transparent-gif-short.gif?fit=480%2C272&ssl=1"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/fire.wav" typeof="audio/wav"></audio>
    </>
  );
};

const TsunamiSkillTeam1 = () => {
  return (
    <>
      <div className="team1-skill">
        <img
          style={{ height: 400, width: 264 }}
          src="https://media2.giphy.com/media/yGhIqFuOx84KY/giphy.gif?cid=6c09b952rwfzw4e25min2jx4gnqt1knqdyx5s8khhph9m85c&rid=giphy.gif&ct=s"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/wave.wav" typeof="audio/wav"></audio>
    </>
  );
};

const TsunamiSkillTeam2 = () => {
  return (
    <>
      <div className="team2-skill">
        <img
          style={{ height: 400, width: 264 }}
          src="https://media2.giphy.com/media/yGhIqFuOx84KY/giphy.gif?cid=6c09b952rwfzw4e25min2jx4gnqt1knqdyx5s8khhph9m85c&rid=giphy.gif&ct=s"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/wave.wav" typeof="audio/wav"></audio>
    </>
  );
};

const ThunderSkillTeam1 = () => {
  return (
    <>
      <div className="team1-skill">
        <img
          style={{ height: 200, width: 200 }}
          src="https://orangemushroom.files.wordpress.com/2016/07/lightning-union-effect.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/thunder.wav" typeof="audio/wav"></audio>
    </>
  );
};
const ThunderSkillTeam2 = () => {
  return (
    <>
      <div className="team2-skill">
        <img
          style={{ height: 200, width: 200 }}
          src="https://orangemushroom.files.wordpress.com/2016/07/lightning-union-effect.gif"
          alt=""
        />
      </div>
      <audio autoPlay={true} src="audio/thunder.wav" typeof="audio/wav"></audio>
    </>
  );
};

export default Location;
