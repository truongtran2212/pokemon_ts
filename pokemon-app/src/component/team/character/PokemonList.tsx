import { Button, Col, Drawer, Modal, notification, Row, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Abilities, Detail, IPokemonDetail, Pokemon } from "../../../interface";
import "./pokemon.css";

const { Search } = Input;

interface Props {
  pokemons: IPokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

interface ChooseTeam {
  isOpenModalChooseTeam: boolean;
  setIsOpenModalChooseTeam: React.Dispatch<React.SetStateAction<boolean>>;
  idPokemon: number;
  setSkillPoke: React.Dispatch<React.SetStateAction<Abilities[]>>;
  skillPoke: Abilities[];
}

const ModalChooseTeam: React.FC<ChooseTeam> = (props) => {
  const {
    isOpenModalChooseTeam,
    setIsOpenModalChooseTeam,
    idPokemon,
    setSkillPoke,
    skillPoke,
  } = props;

  const handleCancel = () => {
    setIsOpenModalChooseTeam(false);
    setSkillPoke([]);
  };

  const openNotificationSuccessTeam1 = () => {
    notification.success({
      message: "Thông báo",
      description: "Thêm vào team 1 thành công.",
    });
  };
  const openCheckNameTeam1 = () => {
    notification.error({
      message: "Thông báo",
      description: "Pokemon này đã có trong team 1.",
    });
  };
  const openCheckNameTeam2 = () => {
    notification.error({
      message: "Thông báo",
      description: "Pokemon này đã có trong team 2.",
    });
  };
  const openNotificationSuccessTeam2 = () => {
    notification.success({
      message: "Thông báo",
      description: "Thêm vào team 2 thành công.",
    });
  };
  const openNotificationError = () => {
    notification.warning({
      message: "Thông báo",
      description: "Đã đủ team.",
    });
  };

  const chooseTeam1 = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then((res) => {
        let listTeam1 = localStorage.getItem("team1")
          ? JSON.parse(localStorage.team1)
          : [];
        let pokemon = res.data;
        let flag = false;
        if (listTeam1.length === 0) {
          listTeam1.push({
            pokemon,
            hp: 100,
            mana: 100,
            abilities: skillPoke,
          });
          localStorage.setItem("team1", JSON.stringify(listTeam1));
          openNotificationSuccessTeam1();
          handleCancel();
        } else if (listTeam1.length < 3) {
          for (let i = 0; i < listTeam1.length; i++) {
            if (listTeam1[i].pokemon.name !== pokemon.name) {
              flag = true;
            }
            if (listTeam1[i].pokemon.name === pokemon.name) {
              flag = false;
              break;
            }
          }
          if (flag == true) {
            listTeam1.push({
              pokemon,
              hp: 100,
              mana: 100,
              abilities: skillPoke,
            });
            localStorage.setItem("team1", JSON.stringify(listTeam1));
            openNotificationSuccessTeam1();
            handleCancel();
          } else if (flag == false) {
            openCheckNameTeam1();
          }
        } else {
          openNotificationError();
        }
        console.log(listTeam1);
      })
      .catch((err) => {
        console.log("Đã xảy ra lỗi");
      });
  };

  const chooseTeam2 = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then((res) => {
        let listTeam2 = localStorage.getItem("team2")
          ? JSON.parse(localStorage.team2)
          : [];
        let pokemon = res.data;
        let flag = false;
        if (listTeam2.length === 0) {
          listTeam2.push({
            pokemon,
            hp: 100,
            mana: 100,
            abilities: skillPoke,
          });
          localStorage.setItem("team2", JSON.stringify(listTeam2));
          openNotificationSuccessTeam2();
          handleCancel();
        } else if (listTeam2.length < 3) {
          for (let i = 0; i < listTeam2.length; i++) {
            if (listTeam2[i].pokemon.name !== pokemon.name) {
              flag = true;
            }
            if (listTeam2[i].pokemon.name === pokemon.name) {
              flag = false;
              break;
            }
          }
          if (flag == true) {
            listTeam2.push({
              pokemon,
              hp: 100,
              mana: 100,
              abilities: skillPoke,
            });
            localStorage.setItem("team2", JSON.stringify(listTeam2));
            openNotificationSuccessTeam2();
            handleCancel();
          } else if (flag == false) {
            openCheckNameTeam2();
          }
        } else {
          openNotificationError();
        }
      })
      .catch((err) => {
        console.log("Đã xảy ra lỗi");
      });
  };

  return (
    <>
      <Modal
        title="Chọn Team"
        open={isOpenModalChooseTeam}
        onCancel={handleCancel}
        footer={false}
      >
        <Row>
          <Col span={6}></Col>
          <Col span={5}>
            <Button style={{ height: 35, width: 80 }} onClick={chooseTeam1}>
              Team 1
            </Button>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Button style={{ height: 35, width: 80 }} onClick={chooseTeam2}>
              Team 2
            </Button>
          </Col>
          <Col span={6}></Col>
        </Row>

        {/* <Row>
          {listAbility.map((item) => (
            <Col span={3}>
              <button
                onClick={() => addSkill(item)}
                style={{ borderRadius: "100%", width: 50, height: 50 }}
              >
                <img
                  style={{ width: 30, height: 30, cursor: "pointer" }}
                  src={item.image}
                  alt=""
                />
              </button>
            </Col>
          ))}
        </Row> */}
      </Modal>
    </>
  );
};

interface ChooseSkill {
  isOpenModalChooseSkill: boolean;
  setIsOpenModalChooseSkill: React.Dispatch<React.SetStateAction<boolean>>;
  idPokemon: number;
  isOpenChooseTeam: boolean;
  setIsOpenChooseTeam: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChooseSkill: React.FC<ChooseSkill> = (props) => {
  const {
    isOpenModalChooseSkill,
    setIsOpenModalChooseSkill,
    idPokemon,
    isOpenChooseTeam,
    setIsOpenChooseTeam,
  } = props;
  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Đã đủ skill.",
    });
  };
  let listAbilities: Abilities[] = [
    {
      name: "Hút mana",
      image: "https://cdn-icons-png.flaticon.com/512/5966/5966507.png",
      damage: Math.floor(Math.random() * 20) + 10, // 10 => 29
      mana: Math.floor(Math.random() * 9) + 17, // 17 => 25
    },
    {
      name: "Hút máu",
      image:
        "https://rpgmaker.net/media/content/games/4468/screenshots/hp_potion.png",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Đóng băng",
      image:
        "https://lh5.googleusercontent.com/-Dz4-xQmywtCjYDy6rzC7ybz3A16YcV852Vprt8dbCGdx4ECkcSXTtY7GgSMe9G2xJA40DH6O5BJuNMt9sTq34TBoLhmHdU1mJDZ0fru3MyAMjem3KMPrX9sTdrTUTkLbdPf4TCP",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Sấm sét",
      image:
        "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/lightning-icon.png",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Nước",
      image: "https://cdn-icons-png.flaticon.com/512/616/616711.png",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Lửa",
      image:
        "https://freepngimg.com/save/96182-lohri-orange-fire-flame-for-happy-lyrics/600x876",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Động đất",
      image: "https://cdn-icons-png.flaticon.com/512/3426/3426189.png",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
    {
      name: "Gió",
      image: "https://cdn2.iconfinder.com/data/icons/game-1-2/512/wind-512.png",
      damage: Math.floor(Math.random() * 20) + 10,
      mana: Math.floor(Math.random() * 9) + 17,
    },
  ];

  const [listAbility, setListAbility] = useState<Abilities[]>(listAbilities);

  useEffect(() => {
    localStorage.setItem("abilities", JSON.stringify(listAbility));
  }, [isOpenModalChooseSkill]);

  const handleOk = () => {
    setIsOpenModalChooseSkill(false);
    setListAbility(listAbilities);
    setIsOpenChooseTeam(true);
  };
  const handleCancel = () => {
    setListAbility(listAbilities);
    setSkillPoke([]);
    setIsOpenModalChooseSkill(false);
  };

  const [skillPoke, setSkillPoke] = useState<Abilities[]>([]);

  const addSkill = (item: any, index: number) => {
    if (skillPoke.length < 4) {
      setSkillPoke([...skillPoke, item]);
      listAbility.splice(index, 1);
      setListAbility(listAbility);
    }
    if (skillPoke.length === 4) {
      openNotification();
    }
  };
  return (
    <>
      <Modal
        title="Chọn Skill"
        open={isOpenModalChooseSkill}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Row key={10}>
          {listAbility.map((item, index) => (
            <Col span={3}>
              <button
                onClick={() => {
                  addSkill(item, index);
                }}
                style={{
                  borderRadius: "100%",
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                }}
              >
                <img
                  style={{ width: 30, height: 30 }}
                  src={item.image}
                  alt=""
                />
              </button>
            </Col>
          ))}
        </Row>
        <Row>
          <h3>Các skill được chọn</h3>
        </Row>
        <Row key={1}>
          {skillPoke.map((item: any) => (
            <Col span={3}>
              <button style={{ borderRadius: "100%", width: 50, height: 50 }}>
                <img
                  style={{ width: 30, height: 30, cursor: "pointer" }}
                  src={item.image}
                  alt=""
                />
              </button>
            </Col>
          ))}
        </Row>
      </Modal>

      <ModalChooseTeam
        isOpenModalChooseTeam={isOpenChooseTeam}
        setIsOpenModalChooseTeam={setIsOpenChooseTeam}
        setSkillPoke={setSkillPoke}
        idPokemon={idPokemon}
        skillPoke={skillPoke}
      />
    </>
  );
};

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props;
  const [isOpenModalChooseSkill, setIsOpenModalChooseSkill] =
    useState<boolean>(false);
  const [isOpenChooseTeam, setIsOpenChooseTeam] = useState(false);

  const [idPokemon, setIdPokemon] = useState<number>(0);
  const showModalChooseSkill = () => {
    setIsOpenModalChooseSkill(true);
  };

  const selectPokemon = async (id: number) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    localStorage.setItem("player2", JSON.stringify(res.data));
    window.location.assign("http://localhost:3000");
  };

  const [searchPoke, setSearchPoke] = useState<any[]>([]);

  const onSearch = (value: any) => {
    setSearch([]);
    if (value === "") {
      localStorage.removeItem("search");
    }
    if (value !== "") {
      pokemons.map((item: any) => {
        let found = item.name.match(value.toLowerCase());
        if (found !== null) {
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
            .then((res) => {
              setSearch((p: any) => [...p, res.data]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  const [search, setSearch] = useState<any[]>([]);

  useEffect(() => {
    if (search.length > 0) {
      localStorage.setItem("search", JSON.stringify(search));
    }
    setSearchPoke(search);
    console.log("Effect của collection");
  }, [search]);

  return (
    <>
      <Row>
        <Col span={14} style={{ overflow: "scroll", overflowX: "hidden" }}>
          <div className="container">
            <h1 style={{ color: "#fff" }}>POKEMON LIST</h1>
            <div
              className="custom-sticky"
            >
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                  width: 300,
                  marginLeft: "105%",
                }}
                // width={200}
              />
            </div>
            <section className="collection-container">
              {searchPoke.length === 0
                ? pokemons.map((pokemon: any) => {
                    return (
                      <>
                        <section
                          className="pokemon-list-container"
                          onClick={() => {
                            setIdPokemon(pokemon.id);
                            showModalChooseSkill();
                          }}
                        >
                          <p className="pokemon-name"> {pokemon.name} </p>
                          <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt="pokemon"
                            width={120}
                            height={120}
                          />
                        </section>
                      </>
                    );
                  })
                : searchPoke.map((pokemon: any) => {
                    return (
                      <>
                        <section
                          className="pokemon-list-container"
                          onClick={() => {
                            setIdPokemon(pokemon.id);
                            showModalChooseSkill();
                          }}
                        >
                          <p className="pokemon-name"> {pokemon.name} </p>
                          <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt="pokemon"
                            width={120}
                            height={120}
                          />
                        </section>
                      </>
                    );
                  })}
              <ModalChooseSkill
                isOpenModalChooseSkill={isOpenModalChooseSkill}
                setIsOpenModalChooseSkill={setIsOpenModalChooseSkill}
                idPokemon={idPokemon}
                isOpenChooseTeam={isOpenChooseTeam}
                setIsOpenChooseTeam={setIsOpenChooseTeam}
              />
            </section>
          </div>
        </Col>
        <Col span={10} className="background-list" style={{ borderRadius: 15 }}>
          <ListTeam isOpenChooseTeam={isOpenChooseTeam} />
        </Col>
      </Row>
    </>
  );
};

interface Pokemons {
  name: string;
  url: string;
  hp?: number;
  mana?: number;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({ id: 0, isOpened: false });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=2000"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
      localStorage.setItem("pokemons", JSON.stringify(res.data.results));
    };
    getPokemon();
    if (localStorage.getItem("search") !== undefined) {
      localStorage.removeItem("search");
    }
    console.log("Effect lúc load list");
  }, []);

  // const nextPage = async () => {
  //   setLoading(true);
  //   let res = await axios.get(nextUrl);
  //   setNextUrl(res.data.next);
  //   res.data.results.forEach(async (pokemon: Pokemons) => {
  //     const poke = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //     );
  //     setPokemons((p) => [...p, poke.data]);
  //     setLoading(false);
  //   });
  // };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showListTeam = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PokemonCollection
        pokemons={pokemons}
        detail={detail}
        setDetail={setDetail}
      />
    </>
  );
};

interface ListTeam {
  isOpenChooseTeam: boolean;
}

const ListTeam: React.FC<ListTeam> = (props) => {
  const { isOpenChooseTeam } = props;

  let team1 = localStorage.getItem("team1")
    ? JSON.parse(localStorage.team1)
    : [];

  let team2 = localStorage.getItem("team2")
    ? JSON.parse(localStorage.team2)
    : [];

  useEffect(() => {
    localStorage.setItem("team1", JSON.stringify(team1));
  }, [isOpenChooseTeam]);

  useEffect(() => {
    localStorage.setItem("team2", JSON.stringify(team2));
  }, [isOpenChooseTeam]);

  return (
    <>
      <Row
        style={{
          height: "46%",
        }}
      >
        <Col span={1}></Col>
        <Col span={22} className="template-list-team1">
          <img
            src="https://static.wikia.nocookie.net/animated_inanimate_battle/images/b/b9/Team_1_Logo.png"
            style={{ marginLeft: "36%" }}
            width={170}
            height={40}
            alt=""
          />
          {localStorage.getItem("team1") !== null ? (
            <Row style={{ marginLeft: 35 }}>
              {/* Ô 1 */}
              {JSON.parse(localStorage.team1)[0] ? (
                <>
                  <Col span={6} className="pokemon-list-team" key={5}>
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[0].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[0].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[0].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <Col span={6} className="pokemon-list-team-null"></Col>
              )}

              {/* Ô 2 */}

              {JSON.parse(localStorage.team1)[1] ? (
                <>
                  <Col span={6} className="pokemon-list-team">
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[1].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[1].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[1].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={6} className="pokemon-list-team-null"></Col>
                </>
              )}

              {/* Ô 3 */}

              {JSON.parse(localStorage.team1)[2] ? (
                <>
                  <Col span={6} className="pokemon-list-team">
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[2].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[2].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[2].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <Col span={6} className="pokemon-list-team-null"></Col>
              )}
            </Row>
          ) : (
            <>
              <Col span={6} className="pokemon-list-team-null"></Col>
              <Col span={6} className="pokemon-list-team-null"></Col>
              <Col span={6} className="pokemon-list-team-null"></Col>
            </>
          )}
          {/* <Row>
                {localStorage.getItem("abilities")
                  ? JSON.parse(localStorage.abilities).map((item: any) => (
                      <>
                        <Col span={2} className="pokemon-list-abilities">
                          <img src={item.image} alt="" width={40} height={40} />
                        </Col>
                      </>
                    ))
                  : null}
              </Row> */}
        </Col>
        <Col span={1}></Col>
      </Row>

      <Row
        style={{
          height: "8%",
        }}
      >
        <Col span={8}></Col>
        <Col span={8} style={{ display: "flex" }}>
          <Col span={6}></Col>
          <Col span={7}>
            <a
              style={{ display: "flex" }}
              href="http://localhost:3000/location"
            >
              <img
                src="https://media0.giphy.com/media/SwUwZMPpgwHNQGIjI7/giphy.gif?cid=6c09b952uhxxu2pwsxiydomwnc5f0edgapg2wjezjxosxf4a&rid=giphy.gif&ct=s"
                alt=""
                width={120}
                height={80}
                style={{ margin: "auto" }}
              />
            </a>
          </Col>
          <Col span={8}></Col>
        </Col>
        <Col span={8}></Col>
      </Row>

      <Row
        style={{
          height: "46%",
        }}
      >
        <Col span={1}></Col>
        <Col span={22} className="template-list-team2">
          <img
            src="https://static.wikia.nocookie.net/animated_inanimate_battle/images/4/49/Team_2_Logo.png"
            style={{ marginLeft: "36%" }}
            width={170}
            height={40}
            alt=""
          />
          {localStorage.getItem("team2") !== null ? (
            <Row style={{ marginLeft: 35 }}>
              {/* Ô 1 */}
              {JSON.parse(localStorage.team2)[0] ? (
                <>
                  <Col span={6} className="pokemon-list-team" key={5}>
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[0].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[0].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[0].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <Col span={6} className="pokemon-list-team-null"></Col>
              )}

              {/* Ô 2 */}

              {JSON.parse(localStorage.team2)[1] ? (
                <>
                  <Col span={6} className="pokemon-list-team">
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[1].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[1].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[1].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={6} className="pokemon-list-team-null"></Col>
                </>
              )}

              {/* Ô 3 */}

              {JSON.parse(localStorage.team2)[2] ? (
                <>
                  <Col span={6} className="pokemon-list-team">
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[2].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[2].pokemon.sprites
                        .other.dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[2].abilities.map(
                        (item: any) => (
                          <Col
                            span={5}
                            style={{
                              display: "flex",
                              backgroundColor: "#3d405b",
                              margin: "auto",
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={25}
                              height={25}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Col>
                </>
              ) : (
                <Col span={6} className="pokemon-list-team-null"></Col>
              )}
            </Row>
          ) : (
            <>
              <Col span={6} className="pokemon-list-team-null"></Col>
              <Col span={6} className="pokemon-list-team-null"></Col>
              <Col span={6} className="pokemon-list-team-null"></Col>
            </>
          )}
          {/* <Row>
                {localStorage.getItem("abilities")
                  ? JSON.parse(localStorage.abilities).map((item: any) => (
                      <>
                        <Col span={2} className="pokemon-list-abilities">
                          <img src={item.image} alt="" width={40} height={40} />
                        </Col>
                      </>
                    ))
                  : null}
              </Row> */}
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
};

export default PokemonList;
