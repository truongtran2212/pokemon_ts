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
  search: any;
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
    notification.open({
      message: "Thông báo",
      description: "Thêm vào team 1 thành công.",
    });
  };
  const openNotificationSuccessTeam2 = () => {
    notification.open({
      message: "Thông báo",
      description: "Thêm vào team 2 thành công.",
    });
  };
  const openNotificationError = () => {
    notification.open({
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
        if (listTeam1.length < 3) {
          listTeam1.push({ pokemon, hp: 100, mana: 100, abilities: skillPoke });
          localStorage.setItem("team1", JSON.stringify(listTeam1));
          openNotificationSuccessTeam1();
        } else {
          openNotificationError();
        }
        handleCancel();
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
        if (listTeam2.length < 3) {
          listTeam2.push({ pokemon, hp: 100, mana: 100, abilities: skillPoke });
          localStorage.setItem("team2", JSON.stringify(listTeam2));
          openNotificationSuccessTeam2();
        } else {
          openNotificationError();
        }
        handleCancel();
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
}

const ModalChooseSkill: React.FC<ChooseSkill> = (props) => {
  const { isOpenModalChooseSkill, setIsOpenModalChooseSkill, idPokemon } =
    props;
  const [isOpenChooseTeam, setIsOpenChooseTeam] = useState(false);
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
      image:
        "https://freepngimg.com/save/25324-tsunami-transparent-image/1615x1238",
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
        <Row>
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
        <Row>
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
  const { pokemons, detail, setDetail, search } = props;
  const [isOpenModalChooseSkill, setIsOpenModalChooseSkill] =
    useState<boolean>(false);
  const [idPokemon, setIdPokemon] = useState<number>(0);
  const showModalChooseSkill = () => {
    setIsOpenModalChooseSkill(true);
  };

  const selectPokemon = async (id: number) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    localStorage.setItem("player2", JSON.stringify(res.data));
    window.location.assign("http://localhost:3000");
  };

  const [searchPoke, setSearchPoke] = useState(
    localStorage.getItem("search") ? JSON.parse(localStorage.search) : []
  );

  useEffect(() => {
    const changeSearchPoke = () => {
      setSearchPoke(
        localStorage.getItem("search") ? JSON.parse(localStorage.search) : []
      );
    };
    changeSearchPoke();
  }, [searchPoke]);

  return (
    <>
    <h1 style={{color: "#fff"}}>POKEMON LIST</h1>
      {detail.isOpened === false ? (
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
                      <img src={pokemon.sprites.front_default} alt="pokemon" />
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
                      <img src={pokemon.sprites.front_default} alt="pokemon" />
                    </section>
                  </>
                );
              })}
          <ModalChooseSkill
            isOpenModalChooseSkill={isOpenModalChooseSkill}
            setIsOpenModalChooseSkill={setIsOpenModalChooseSkill}
            idPokemon={idPokemon}
          />
        </section>
      ) : (
        <div className="overlay custom-background">
          <Link to="/location"></Link>
        </div>
      )}
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

  let team1 = localStorage.getItem("team1")
    ? JSON.parse(localStorage.team1)
    : null;

  let team2 = localStorage.getItem("team2")
    ? JSON.parse(localStorage.team2)
    : null;
  const [search, setSearch] = useState<any[]>([]);

  const onSearch = (value: any) => {
    setSearch([]);
    if (value === "") {
      console.log(pokemons);
      console.log(value);
      localStorage.removeItem("search");
      localStorage.setItem("search", JSON.stringify(pokemons));
    }
    if (value !== "") {
      pokemons.map((item: any) => {
        let found = item.name.match(value);
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

  useEffect(() => {
    if (search.length > 0) {
      localStorage.setItem("search", JSON.stringify(search));
    }
  }, [search]);

  return (
    <>
      <Row>
        <Col span={14} style={{ overflow: "scroll", overflowX: "hidden" }}>
          <Row style={{ display: "flex" }}>
            {/* <Col span={8}>
              <header className="pokemon-header"> Pokemon</header>
            </Col> */}
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </Row>
          <div className="container">
            {detail.isOpened === false ? (
              <>
                <Drawer
                  title="Danh sách Team"
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  open={open}
                  key={placement}
                  width={700}
                >
                  <h1>TEAM 1</h1>
                  <Row>
                    {localStorage.getItem("team1")
                      ? JSON.parse(localStorage.team1).map((item: any) => (
                          <>
                            <Col span={1}></Col>
                            <Col span={7}>
                              <p>{item.pokemon.name}</p>
                              <img
                                src={item.pokemon.sprites.front_default}
                                alt=""
                              />
                            </Col>
                          </>
                        ))
                      : null}
                  </Row>
                  <h1>TEAM 2</h1>

                  <Row>
                    {localStorage.getItem("team2")
                      ? JSON.parse(localStorage.team2).map((item: any) => (
                          <>
                            <Col span={1}></Col>
                            <Col span={7}>
                              <p>{item.pokemon.name}</p>
                              <img
                                src={item.pokemon.sprites.front_default}
                                alt=""
                              />
                            </Col>
                          </>
                        ))
                      : null}
                  </Row>
                </Drawer>
                <PokemonCollection
                  pokemons={pokemons}
                  detail={detail}
                  setDetail={setDetail}
                  search={search}
                />
                {!detail.isOpened && (
                  <div className="btn">
                    {/* <Button onClick={nextPage}>
                      {loading ? "LOADING..." : "LOAD MORE"}
                    </Button> */}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </Col>
        <Col span={10} style={{ backgroundColor: "#E8E9EB", borderRadius: 15 }}>
          <Row
            style={{
              height: "46%",
            }}
          >
            <Col span={1}></Col>
            <Col
              span={22}
              style={{
                border: "1px solid black",
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <h1>Team 1</h1>
              <Row>
                {team1
                  ? team1.map((item: any) => (
                      <>
                        <Col span={6} className="pokemon-list-team">
                          <strong style={{ color: "#3d405b" }}>
                            {item.pokemon.name}
                          </strong>
                          <img
                            src={item.pokemon.sprites.front_default}
                            alt=""
                          />
                          <Row>
                            {item.abilities.map((item: any) => (
                              <Col
                                span={5}
                                style={{
                                  display: "flex",
                                  backgroundColor: "#3d405b",
                                  margin: "2px",
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
                            ))}
                          </Row>
                        </Col>
                      </>
                    ))
                  : null}
              </Row>
              <Row>
                {localStorage.getItem("abilities")
                  ? JSON.parse(localStorage.abilities).map((item: any) => (
                      <>
                        <Col span={2} className="pokemon-list-abilities">
                          <img src={item.image} alt="" width={40} height={40} />
                        </Col>
                      </>
                    ))
                  : null}
              </Row>
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
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Battle_icon_gladii.svg/2048px-Battle_icon_gladii.svg.png"
                alt=""
                width={50}
                height={50}
                style={{ margin: "auto" }}
              />
            </Col>
            <Col span={8}></Col>
          </Row>

          <Row
            style={{
              height: "46%",
            }}
          >
            <Col span={1}></Col>
            <Col
              span={22}
              style={{
                border: "1px solid black",
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <h1>Team 2</h1>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PokemonList;
