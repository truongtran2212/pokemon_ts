import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  getIP,
  manageAbilities,
  managePlayer1,
  managePlayer2,
  manageRoom,
} from "../../constants";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { localhost } from "../../server";
import PokemonList from "../team/character/PokemonList";

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [player1List, setPlayer1List] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [form] = Form.useForm();
  const [idRoom, setIdRoom] = useState(0);
  const [ipAddress, setIpAddress] = useState("");

  // const getListPokemon = () => {
  //   axios
  //     .get(manageAbilities)
  //     .then((res: any) => {
  //       setPokemonList(res.data);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // };

  const getListPlayer1 = () => {
    axios
      .get(managePlayer1)
      .then((res: any) => {
        setPlayer1List(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const addRoom = (id: any) => {
    const inforRoom = {
      player_1: id,
      description: null,
      time_start: null,
      time_end: null,
    };
    axios
      .post(manageRoom, inforRoom)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const updateRoom = (id: number, idRoom: number) => {
    const inforRoom = {
      id: idRoom,
      player_2: id,
      description: null,
      time_start: null,
      time_end: null,
    };
    console.log("Vô P2");
    axios
      .put(manageRoom, inforRoom)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const toPokemonList = useCallback(
    () => navigate("/pokemonList", { replace: true }),
    [navigate]
  );

  const [localPlayer1, setLocalPlayer1] = useState({
    id: null,
    name: null,
    IP: null,
  });

  const onFinish = (values: any) => {
    const player1 = {
      skill_1_1: null,
      skill_2_1: null,
      skill_3_1: null,
      skill_4_1: null,
      skill_1_2: null,
      skill_2_2: null,
      skill_3_2: null,
      skill_4_2: null,
      skill_1_3: null,
      skill_2_3: null,
      skill_3_3: null,
      skill_4_3: null,
      name: values.name,
      name_pokemon_1: null,
      name_pokemon_2: null,
      name_pokemon_3: null,
      address_mac: ipAddress,
      is_status: false,
      is_win: false,
      is_active: false,
    };

    const player2 = {
      skill_1_1: null,
      skill_2_1: null,
      skill_3_1: null,
      skill_4_1: null,
      skill_1_2: null,
      skill_2_2: null,
      skill_3_2: null,
      skill_4_2: null,
      skill_1_3: null,
      skill_2_3: null,
      skill_3_3: null,
      skill_4_3: null,
      name: values.name,
      name_pokemon_1: null,
      name_pokemon_2: null,
      name_pokemon_3: null,
      address_mac: ipAddress,
      is_status: false,
      is_win: false,
      is_active: false,
    };

    axios
      .get(manageRoom)
      .then((res: any) => {
        setRoomList(res.data);

        if (res.data.length === 0) {
          axios
            .post(managePlayer1, player1)
            .then((resp1) => {
              form.resetFields();
              addRoom(resp1.data.id_player1);
              localStorage.setItem("idPlayer1", resp1.data.id_player1);
              // localStorage.setItem("namePlayer1", values.name);
              // localStorage.setItem("IP_Player1", ipAddress);
              if (localStorage.idPlayer2 !== undefined) {
                localStorage.removeItem("idPlayer2");
                // localStorage.removeItem("namePlayer2");
                // localStorage.removeItem("IP_Player2");
              }
              toPokemonList();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data.length !== 0) {
          axios
            .post(managePlayer2, player2)
            .then((resp2) => {
              form.resetFields();
              updateRoom(resp2.data.id_player2, res.data[0].id);
              setIdRoom(res.data[0].id);

              localStorage.setItem("idPlayer2", resp2.data.id_player2);
              // localStorage.setItem("namePlayer2", values.name);
              // localStorage.setItem("IP_Player2", ipAddress);
              if (localStorage.idPlayer1 !== undefined) {
                localStorage.removeItem("idPlayer1");
                // localStorage.removeItem("namePlayer1");
                // localStorage.removeItem("IP_Player1");
              }
              toPokemonList();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(getIP)
      .then((res) => {
        setIpAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getListPlayer1();
  }, []);

  return (
    <>
      {console.log(ipAddress)}
      <Form
        form={form}
        // layout="vertical"
        // autoComplete="off"
        onFinish={onFinish}
        // // onFinishFailed={onFinishFailed}
        // validateMessages={validateMessages}
        // loading={loading}
        initialValues={{
          remember: true,
        }}
        key="form_team"
      >
        <Row style={{ display: "flex", height: "100vh" }}>
          <Col span={8}></Col>
          <Col span={8} style={{ marginTop: "13%" }}>
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
              width={650}
              height={170}
            />
            <Row>
              <Col span={8}></Col>
              <Col span={11}>
                {" "}
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                  ]}
                  key="name_team"
                >
                  <Input
                    className="input-nickname"
                    maxLength={50}
                    placeholder="Nickname"
                  ></Input>
                </Form.Item>
                <Form.Item style={{ marginTop: "20px" }}>
                  <button type="submit" className="btn-22">
                    TAP TO START
                  </button>
                </Form.Item>
              </Col>
              <Col span={5}></Col>
            </Row>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Form>
    </>
  );
};

export default HomePage;
