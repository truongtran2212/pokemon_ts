import {
  Button,
  Col,
  Drawer,
  Modal,
  notification,
  Row,
  Input,
  Spin,
  Tooltip,
} from "antd";
import axios from "axios";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Abilities, Detail, IPokemonDetail, Pokemon } from "../../../interface";
import "./pokemon.css";
import {
  LineOutlined,
  LoadingOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const UserContext = createContext<IPokemonDetail[]>([]);
notification.config({
  placement: "top",
  duration: 1.5,
});

interface Props {
  pokemons: IPokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  loading: boolean;
}

let listAbilities: Abilities[] = [
  {
    name: "Hút mana",
    image: "https://cdn-icons-png.flaticon.com/512/5966/5966507.png",
    damage: Math.floor(Math.random() * 12) + 10, // 10 => 22
    mana: Math.floor(Math.random() * 9) + 17, // 17 => 25
  },
  {
    name: "Hút máu",
    image:
      "https://rpgmaker.net/media/content/games/4468/screenshots/hp_potion.png",
    damage: Math.floor(Math.random() * 10) + 10, // 10 => 20
    mana: Math.floor(Math.random() * 9) + 17, // 17 => 25
  },

  {
    name: "Lửa",
    image:
      "https://freepngimg.com/save/96182-lohri-orange-fire-flame-for-happy-lyrics/600x876",
    damage: Math.floor(Math.random() * 20) + 10,
    mana: Math.floor(Math.random() * 9) + 17,
  },
  {
    name: "Sấm sét",
    image:
      "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-lightning-icon-simple-transparent-background-png-image_6486043.png",
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
    name: "Đóng băng",
    image: "https://icon-library.com/images/freeze-icon/freeze-icon-16.jpg",
    damage: Math.floor(Math.random() * 15) + 10,
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
    image:
      "https://cdn3.iconfinder.com/data/icons/role-playing-game-5/340/game_magic_fantasy_spell_storm_tornado_wind-512.png",
    damage: Math.floor(Math.random() * 20) + 10,
    mana: Math.floor(Math.random() * 9) + 17,
  },
];

localStorage.setItem("abilities", JSON.stringify(listAbilities));

interface ChooseTeam {
  isOpenModalChooseTeam: boolean;
  setIsOpenModalChooseTeam: React.Dispatch<React.SetStateAction<boolean>>;
  idPokemon: number;
  // setSkillPoke: React.Dispatch<React.SetStateAction<Abilities[]>>;
  // skillPoke: Abilities[];
}

const openNotificationSuccessTeam1 = () => {
  notification.success({
    message: "Thêm vào team 1 thành công.",
  });
};
const openCheckNameTeam1 = () => {
  notification.error({
    message: "Pokemon này đã có trong team 1.",
  });
};

const openCheckNameTeam2 = () => {
  notification.error({
    message: "Pokemon này đã có trong team 2.",
  });
};
const openNotificationSuccessTeam2 = () => {
  notification.success({
    message: "Thêm vào team 2 thành công.",
  });
};
const openNotificationError = () => {
  notification.warning({
    message: "Đã đủ team.",
  });
};
const openNotificationSuccessEditSkill = () => {
  notification.success({
    message: "Cập nhật Pokemon thành công.",
  });
};
const openNotificationSuccessEditPokemon = () => {
  notification.success({
    message: "Thay đổi POKEMON thành công.",
  });
};

const ModalChooseTeam: React.FC<ChooseTeam> = (props) => {
  const { isOpenModalChooseTeam, setIsOpenModalChooseTeam, idPokemon } = props;

  const handleCancel = () => {
    setIsOpenModalChooseTeam(false);
    // setSkillPoke([]);
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
            abilities: [],
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
          if (flag === true) {
            listTeam1.push({
              pokemon,
              hp: 100,
              mana: 100,
              abilities: [],
            });
            localStorage.setItem("team1", JSON.stringify(listTeam1));
            openNotificationSuccessTeam1();
            handleCancel();
          } else if (flag === false) {
            openCheckNameTeam1();
          }
        } else {
          openNotificationError();
        }
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
            abilities: [],
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
          if (flag === true) {
            listTeam2.push({
              pokemon,
              hp: 100,
              mana: 100,
              abilities: [],
            });
            localStorage.setItem("team2", JSON.stringify(listTeam2));
            openNotificationSuccessTeam2();
            handleCancel();
          } else if (flag === false) {
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
        open={isOpenModalChooseTeam}
        onCancel={handleCancel}
        footer={false}
        width={"40%"}
        style={{ marginTop: "9%" }}
        getContainer={false}
        className="bg-choose-team"
        closeIcon={<CloseOutlined style={{ color: "#fff", fontSize: 24 }} />}
      >
        <h1 style={{ color: "#fff", textAlign: "center", fontSize: 30 }}>
          CHỌN TEAM
        </h1>
        <Row style={{ height: 150, display: "flex" }}>
          <Col span={2}></Col>
          <Col span={4} style={{ margin: "auto" }}>
            <img
              src="image/team1.gif"
              alt=""
              className="btn-team"
              onClick={chooseTeam1}
            />
          </Col>
          <Col span={5}></Col>
          <Col span={4} style={{ margin: "auto" }}>
            <img
              src="image/team2.gif"
              alt=""
              className="btn-team"
              onClick={chooseTeam2}
            />
          </Col>
          <Col span={4}></Col>
        </Row>
      </Modal>
    </>
  );
};

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail, loading } = props;
  const [isOpenChooseTeam, setIsOpenChooseTeam] = useState<boolean>(false);

  const [idPokemon, setIdPokemon] = useState<number>(0);

  const showModalChooseTeam = () => {
    setIsOpenChooseTeam(true);
  };

  const [search, setSearch] = useState<Pokemon[]>([]);

  const onSearch = (value: any) => {
    if (value === "") {
      setSearch([]);
    }
    if (value !== "") {
      const promises = pokemons
        .filter((pokemon) => pokemon.name.includes(value.toLowerCase()))
        .map((pokemon) =>
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((res) => res.data)
            .catch((err) => {
              return null;
            })
        );
      Promise.all(promises).then((results) => {
        const validResults = results.filter((result) => result !== null);
        setSearch(validResults);
      });
    }
  };

  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 100,
      }}
    />
  );
  return (
    <>
      <Row>
        <Col span={14} style={{ overflow: "scroll", overflowX: "hidden" }}>
          <div className="container">
            <h1 style={{ color: "#fff" }}>POKEMON LIST</h1>
            <div className="custom-sticky">
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                  width: 300,
                  marginLeft: "130%",
                }}
                id="focus"
                // loading={true}
                // width={200}
              />
            </div>
            <Spin
              spinning={loading}
              indicator={loadingIcon}
              className="loading"
              style={{ marginTop: 300 }}
            >
              <section className="collection-container">
                {search.length === 0
                  ? pokemons.map((pokemon: any, index: number) => {
                      return (
                        <>
                          <section
                            className="pokemon-list-container"
                            onClick={() => {
                              setIdPokemon(pokemon.id);
                              showModalChooseTeam();
                            }}
                            key={index}
                          >
                            <p className="pokemon-name"> {pokemon.name} </p>
                            <img
                              src={
                                pokemon.sprites.other.dream_world.front_default
                              }
                              alt="pokemon"
                              width={120}
                              height={120}
                            />
                          </section>
                        </>
                      );
                    })
                  : search.map((pokemon: any, index: number) => {
                      return (
                        <>
                          <section
                            className="pokemon-list-container"
                            onClick={() => {
                              setIdPokemon(pokemon.id);
                              showModalChooseTeam();
                            }}
                            key={index}
                          >
                            <p className="pokemon-name"> {pokemon.name} </p>
                            <img
                              src={
                                pokemon.sprites.other.dream_world.front_default
                              }
                              alt="pokemon"
                              width={120}
                              height={120}
                            />
                          </section>
                        </>
                      );
                    })}
                <ModalChooseTeam
                  idPokemon={idPokemon}
                  isOpenModalChooseTeam={isOpenChooseTeam}
                  setIsOpenModalChooseTeam={setIsOpenChooseTeam}
                />
              </section>
            </Spin>
          </div>
        </Col>
        <Col span={10} className="background-list" style={{ borderRadius: 15 }}>
          <UserContext.Provider value={pokemons}>
            <ListTeam isOpenChooseTeam={isOpenChooseTeam} />
          </UserContext.Provider>
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
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({ id: 0, isOpened: false });
  const limit: number = 600;

  const getPokemon = useCallback(async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    if (pokemons.length < limit) {
      const promises = res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return poke.data;
      });
      const newPokemons = await Promise.all(promises);
      setPokemons((p) => [...p, ...newPokemons]);
    }
    if (pokemons.length === limit) {
      console.log("Không load nữa");
    }
    setLoading(false);
  }, [limit, setPokemons, pokemons.length]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  return (
    <>
      <PokemonCollection
        pokemons={pokemons}
        detail={detail}
        setDetail={setDetail}
        loading={loading}
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

  const openNotificationQuantityTeam2 = () => {
    notification.warning({
      message: "Team 2 hiện tại chưa đủ đội hình",
    });
  };
  const openNotificationQuantityTeam1 = () => {
    notification.warning({
      message: "Team 1 hiện tại chưa đủ đội hình",
    });
  };
  const openNotificationQuantityPoke = () => {
    notification.warning({
      message: "Cả 2 team đều chưa đủ đội hình",
    });
  };

  const openNotificationQuantitySkillTeam1 = () => {
    notification.warning({
      message: "Poke Team 1 chưa đủ skill.",
    });
  };

  const openNotificationQuantitySkillTeam2 = () => {
    notification.warning({
      message: "Poke Team 2 chưa đủ skill.",
    });
  };
  const openNotificationQuantitySkill = () => {
    notification.warning({
      message: "Poke cả 2 team đều thiếu skill.",
    });
  };

  const [isOpenModalDetail, setIsModalDetail] = useState<boolean>(false);
  const [detailPokemon, setDetailPokemon] = useState();
  const [team, setTeam] = useState<number>(0);

  const onShowModalDetail = (value: any) => {
    setIsModalDetail(true);
    setDetailPokemon(value);
  };
  const navigate = useNavigate();

  const goToArena = () => {
    let flagTeam1 = false;
    let flagTeam2 = false;

    for (let i = 0; i < team1.length; i++) {
      if (team1[i].abilities.length < 4) {
        flagTeam1 = false;
        break;
      } else {
        flagTeam1 = true;
      }
    }

    for (let i = 0; i < team1.length; i++) {
      if (team2[i].abilities.length < 4) {
        flagTeam2 = false;
        break;
      } else {
        flagTeam2 = true;
      }
    }

    if (flagTeam1 === false && flagTeam2 === true) {
      openNotificationQuantitySkillTeam1();
    }

    if (flagTeam2 === false && flagTeam1 === true) {
      openNotificationQuantitySkillTeam2();
    }
    if (flagTeam2 === false && flagTeam1 === false) {
      openNotificationQuantitySkill();
    }

    if (flagTeam2 === true && flagTeam1 === true) {
      navigate("/location", { replace: true });
      console.log("Check navigate");
    }
  };

  return (
    <>
      <Row
        style={{
          height: "42%",
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
            <Row style={{ marginLeft: 35, marginTop: " 4%" }}>
              {/* Ô 1 */}
              {JSON.parse(localStorage.team1)[0] ? (
                <>
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    key={5}
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team1)[0]);
                      setTeam(1);
                    }}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[0].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[0].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[0].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team1)[1]);
                      setTeam(1);
                    }}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[1].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[1].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[1].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team1)[2]);
                      setTeam(1);
                    }}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team1)[2].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team1)[2].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team1)[2].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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
        </Col>
        <Col span={1}></Col>
      </Row>

      <Row
        style={{
          height: "15%",
        }}
      >
        <Col span={8}></Col>

        <Col span={8} style={{ display: "flex" }}>
          <Col span={7}></Col>
          <Col span={7}>
            {team1.length === 3 && team2.length === 3 ? (
              // <Link style={{ display: "flex" }} to={"/location"}>
              <img
                src="https://icon-library.com/images/swords-icon/swords-icon-12.jpg"
                alt=""
                width={130}
                height={130}
                style={{ margin: "auto", cursor: "pointer" }}
                onClick={goToArena}
              />
            ) : // </Link>
            team1.length < 3 && team2.length < 3 ? (
              <img
                src="https://icon-library.com/images/swords-icon/swords-icon-12.jpg"
                alt=""
                width={130}
                height={130}
                style={{ margin: "auto", cursor: "pointer" }}
                onClick={openNotificationQuantityPoke}
              />
            ) : team1.length < 3 ? (
              <img
                src="https://icon-library.com/images/swords-icon/swords-icon-12.jpg"
                alt=""
                width={130}
                height={130}
                style={{ margin: "auto", cursor: "pointer" }}
                onClick={openNotificationQuantityTeam1}
              />
            ) : team2.length < 3 ? (
              <img
                src="https://icon-library.com/images/swords-icon/swords-icon-12.jpg"
                alt=""
                width={130}
                height={130}
                style={{ margin: "auto", cursor: "pointer" }}
                onClick={openNotificationQuantityTeam2}
              />
            ) : null}
          </Col>
        </Col>
        <Col span={8}></Col>
      </Row>

      <Row
        style={{
          height: "42%",
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
            <Row style={{ marginLeft: 35, marginTop: " 4%" }}>
              {/* Ô 1 */}
              {JSON.parse(localStorage.team2)[0] ? (
                <>
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team2)[0]);
                      setTeam(2);
                    }}
                    key={5}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[0].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[0].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[0].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team2)[1]);
                      setTeam(2);
                    }}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[1].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[1].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[1].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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
                  <Col
                    span={6}
                    className="pokemon-list-team"
                    onClick={() => {
                      onShowModalDetail(JSON.parse(localStorage.team2)[2]);
                      setTeam(2);
                    }}
                  >
                    <strong style={{ color: "#3d405b", textAlign: "center" }}>
                      {JSON.parse(localStorage.team2)[2].pokemon.name}
                    </strong>
                    <img
                      src={
                        JSON.parse(localStorage.team2)[2].pokemon.sprites.other
                          .dream_world.front_default
                      }
                      alt=""
                      width={140}
                      height={140}
                    />
                    <Row>
                      {JSON.parse(localStorage.team2)[2].abilities.map(
                        (item: any, index: number) => (
                          <Col span={5} className="skill-pokemon" key={index}>
                            <img
                              style={{ margin: "auto" }}
                              src={item.image}
                              alt=""
                              width={28}
                              height={28}
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

      <DetailPokemon
        isOpenModalDetail={isOpenModalDetail}
        setIsModalDetail={setIsModalDetail}
        detailPokemon={detailPokemon}
        setDetailPokemon={setDetailPokemon}
        team={team}
      />
    </>
  );
};

interface DetailPokemon {
  isOpenModalDetail: boolean;
  setIsModalDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detailPokemon: any;
  team: number;
  setDetailPokemon: React.Dispatch<React.SetStateAction<undefined>>;
}

const DetailPokemon: React.FC<DetailPokemon> = (props) => {
  const openNotification = () => {
    notification.open({
      message: "Đã đủ skill.",
    });
  };
  const openNotificationQuantitySkill = () => {
    notification.warning({
      message: "Poke chưa đủ skill",
    });
  };

  const openNotificationCheckSkill = () => {
    notification.error({
      message: "Đã có skill này.",
    });
  };

  const {
    isOpenModalDetail,
    setIsModalDetail,
    detailPokemon,
    team,
    setDetailPokemon,
  } = props;
  const [skillPoke, setSkillPoke] = useState<Abilities[]>(
    detailPokemon ? detailPokemon.abilities : []
  );
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const pokemons = useContext(UserContext);
  const [idPokemon, setIdPokemon] = useState<number>(0);
  const [search, setSearch] = useState<Pokemon[]>([]);

  let team1: any = [];
  let team2: any = [];

  const addSkill = (item: any) => {
    let flag = false;
    if (skillPoke.length === 0) {
      setSkillPoke([...skillPoke, item]);
    }
    if (skillPoke.length < 4 && skillPoke.length > 0) {
      for (let i = 0; i < skillPoke.length; i++) {
        if (skillPoke[i].name !== item.name) {
          flag = false;
        } else if (skillPoke[i].name === item.name) {
          flag = true;
          break;
        }
      }
      if (flag === false) {
        setSkillPoke([...skillPoke, item]);
      } else if (flag === true) {
        openNotificationCheckSkill();
      }
    }
    if (skillPoke.length === 4) {
      openNotification();
    }
  };

  const lockTeam1 = () => {
    const temp = localStorage.getItem("team1");
    if (temp) {
      team1 = JSON.parse(temp);
    }
    const check = team1.find(
      (item: any) => item.pokemon.name === detailPokemon.pokemon.name
    );

    if (check) {
      if (skillPoke.length === 4) {
        check.abilities = skillPoke;
        localStorage.setItem("team1", JSON.stringify(team1));
        setIsModalDetail(false);
        openNotificationSuccessEditSkill();
      }
      if (skillPoke.length < 4) {
        openNotificationQuantitySkill();
      }
    }
  };

  const lockTeam2 = () => {
    const temp = localStorage.getItem("team2");
    if (temp) {
      team2 = JSON.parse(temp);
    }
    const check = team2.find(
      (item: any) => item.pokemon.name === detailPokemon.pokemon.name
    );
    if (check) {
      if (skillPoke.length === 4) {
        check.abilities = skillPoke;
        localStorage.setItem("team2", JSON.stringify(team2));
        setIsModalDetail(false);
        openNotificationSuccessEditSkill();
      }
      if (skillPoke.length < 4) {
        openNotificationQuantitySkill();
      }
    }
  };

  useEffect(() => {
    setSkillPoke(detailPokemon ? detailPokemon.abilities : []);
    setIsOpenDrawer(false);
    setValueSearch("");
    onSearch(valueSearch);
  }, [isOpenModalDetail]);

  const onCloseModal = () => {
    setIsModalDetail(false);
  };

  const removeSkill = (index: number) => {
    skillPoke.splice(index, 1);
    setSkillPoke([...skillPoke]);
  };

  const openListPokeEdit = () => {
    setIsOpenDrawer(true);
  };

  const editPokemonTeam1 = (value: any) => {
    const temp = localStorage.getItem("team1");
    let checkNameTeam1 = false;
    if (temp) {
      team1 = JSON.parse(temp);
    }
    const check = team1.find(
      (item: any) => item.pokemon.name === detailPokemon.pokemon.name
    );

    for (let i = 0; i < team1.length; i++) {
      if (team1[i].pokemon.name === value.name) {
        checkNameTeam1 = false;
        break;
      } else {
        checkNameTeam1 = true;
      }
    }
    if (checkNameTeam1 === true) {
      if (check) {
        detailPokemon.pokemon = value;
        check.pokemon = value;
        localStorage.setItem("team1", JSON.stringify(team1));
        setIsOpenDrawer(false);
        openNotificationSuccessEditPokemon();
      } else {
        console.log(check);
      }
    }
    if (checkNameTeam1 === false) {
      openCheckNameTeam1();
    }
  };

  const editPokemonTeam2 = (value: any) => {
    const temp = localStorage.getItem("team2");
    let checkNameTeam2 = false;

    if (temp) {
      team2 = JSON.parse(temp);
    }
    const check = team2.find(
      (item: any) => item.pokemon.name === detailPokemon.pokemon.name
    );
    for (let i = 0; i < team2.length; i++) {
      if (team2[i].pokemon.name === value.name) {
        checkNameTeam2 = false;
        break;
      } else {
        checkNameTeam2 = true;
      }
    }

    if (checkNameTeam2 === true) {
      if (check) {
        detailPokemon.pokemon = value;
        check.pokemon = value;
        localStorage.setItem("team2", JSON.stringify(team2));
        setIsOpenDrawer(false);
        openNotificationSuccessEditPokemon();
      } else {
        console.log(check);
      }
    }
    if (checkNameTeam2 === false) {
      openCheckNameTeam2();
    }
  };

  const [valueSearch, setValueSearch] = useState("");
  const onSearch = async (value: string) => {
    if (value === "") {
      setSearch([]);
    }
    if (value !== "") {
      const promises = pokemons
        .filter((pokemon) => pokemon.name.includes(value.toLowerCase()))
        .map((pokemon) =>
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((res) => res.data)
            .catch((err) => {
              return null;
            })
        );
      Promise.all(promises).then((results) => {
        const validResults = results.filter((result) => result !== null);
        setSearch(validResults);
      });
    }
  };

  return (
    <>
      <Modal
        open={isOpenModalDetail}
        onCancel={onCloseModal}
        footer={false}
        closeIcon={
          <img
            src="https://freepngimg.com/save/130412-x-letter-picture-free-png-hq/512x512"
            alt=""
            width={30}
            height={30}
          ></img>
        }
        zIndex={1}
        style={{ overflow: "hidden" }}
        width={"60%"}
        className="custom-modal"
      >
        <Drawer
          title={
            <Search
              placeholder="input search text"
              allowClear
              onSearch={(value) => onSearch(value)}
              style={{
                width: 300,
              }}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              // width={200}
            />
          }
          placement={"right"}
          closable={true}
          onClose={() => setIsOpenDrawer(false)}
          open={isOpenDrawer}
          key={"right"}
          style={{ borderRadius: "0px 8px 8px 0px" }}
          getContainer={false}
          zIndex={1200}
          width={"60%"}
        >
          <Row>
            <Col span={24}>
              <div>
                <section className="collection-container">
                  {search.length === 0
                    ? pokemons.map((pokemon: any, index: number) => {
                        return (
                          <>
                            <section
                              className="pokemon-list-edit"
                              onClick={() => {
                                team === 1
                                  ? editPokemonTeam1(pokemon)
                                  : editPokemonTeam2(pokemon);
                              }}
                              key={index}
                            >
                              <p className="pokemon-name"> {pokemon.name} </p>
                              <img
                                src={
                                  pokemon.sprites.other.dream_world
                                    .front_default
                                }
                                alt="pokemon"
                                width={120}
                                height={120}
                              />
                            </section>
                          </>
                        );
                      })
                    : search.map((pokemon: any, index: number) => {
                        return (
                          <>
                            <section
                              className="pokemon-list-edit"
                              onClick={() => {
                                team === 1
                                  ? editPokemonTeam1(pokemon)
                                  : editPokemonTeam2(pokemon);
                              }}
                              key={index}
                            >
                              <p className="pokemon-name"> {pokemon.name} </p>
                              <img
                                src={
                                  pokemon.sprites.other.dream_world
                                    .front_default
                                }
                                alt="pokemon"
                                width={120}
                                height={120}
                              />
                            </section>
                          </>
                        );
                      })}
                </section>
              </div>
            </Col>
          </Row>
        </Drawer>
        <h1 style={{ color: "#fff", textAlign: "center" }}>CHỌN KỸ NĂNG</h1>

        <Row style={{ display: "flex", marginTop: "2%" }}>
          <Col span={8}>
            <div>
              <Tooltip
                placement="right"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/take_mana.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginLeft: "55%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[0])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[0].image}
                    alt=""
                    width={70}
                  />
                </button>
              </Tooltip>
            </div>

            <div>
              <Tooltip
                placement="right"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/health.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginLeft: "40%",
                    marginTop: "7%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[1])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[1].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement="right"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/fire.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginLeft: "40%",
                    marginTop: "7%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[2])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[2].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement="right"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/thunder.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginLeft: "55%",
                    marginTop: "7%",
                  }}
                  // disabled={true}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[3])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[3].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
          </Col>

          <Col span={8}>
            <div>
              <img
                src="https://media0.giphy.com/media/mUm6ULzNcCUpeq2zQO/giphy.gif?cid=6c09b9526e3296f22f00acb4322635cf33fa961ef3ac60b2&rid=giphy.gif&ct=s"
                alt=""
                className="swap-pokemon"
                width={200}
                height={200}
                onClick={openListPokeEdit}
              />
              <img
                src={
                  detailPokemon !== undefined
                    ? detailPokemon.pokemon.sprites.other.dream_world
                        .front_default
                    : null
                }
                alt=""
                height={400}
                width={410}
                style={{ margin: "auto", cursor: "pointer" }}
                onClick={openListPokeEdit}
              />
              <div className="background-skill">
                <h1 style={{ color: "#fff" }}>Các kỹ năng đã được chọn</h1>
                <Row>
                  <Col span={3}></Col>
                  {detailPokemon !== undefined
                    ? skillPoke.map((item: any, index: number) => (
                        <Col span={5} key={index}>
                          <button
                            className="list-skill"
                            onClick={() => removeSkill(index)}
                          >
                            <LineOutlined />
                          </button>
                          <button className="chose-skill">
                            <img
                              src={item.image}
                              alt=""
                              height={40}
                              width={40}
                            />
                          </button>
                        </Col>
                      ))
                    : null}
                </Row>
              </div>
            </div>
          </Col>

          <Col span={8}>
            <div>
              <Tooltip
                placement="left"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/tsunami.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginLeft: "20%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[4])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[4].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement="left"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/freeze.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginTop: "7%",
                    marginLeft: "35%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[5])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[5].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement="left"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/earthquake.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginTop: "7%",
                    marginLeft: "35%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[6])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[6].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement="left"
                color="rgba(0,0,0,0)"
                arrow={false}
                title={
                  <>
                    <img
                      src="detail_skill/tornado.jpg"
                      alt=""
                      width="200px"
                      height="150px"
                      style={{ opacity: 0.9, borderRadius: 10 }}
                    />
                  </>
                }
              >
                <button
                  className="btn-skill"
                  style={{
                    marginTop: "7%",
                    marginLeft: "20%",
                  }}
                  onClick={() =>
                    addSkill(JSON.parse(localStorage.abilities)[7])
                  }
                >
                  <img
                    src={JSON.parse(localStorage.abilities)[7].image}
                    alt=""
                    width={70}
                    height={70}
                  />
                </button>
              </Tooltip>
            </div>
          </Col>
        </Row>

        <Row>
          <Button onClick={team === 1 ? lockTeam1 : lockTeam2}>Khóa</Button>
        </Row>
      </Modal>
    </>
  );
};

interface Error {
  error: any;
}

const ErrorComponent: React.FC<Error> = (prorps) => {
  const { error } = prorps;
  return <div>{error.message}</div>;
};

// export default withErrorBoundary(PokemonList, {
//   FallbackComponent: ErrorComponent,
// });
export default memo(PokemonList);
