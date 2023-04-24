import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { manageAbilities, managePlayer1 } from "../../constants";
import "./HomePage.css";
const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [form] = Form.useForm();

  const getListPokemon = () => {
    axios
      .get(manageAbilities)
      .then((res: any) => {
        setPokemonList(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const onFinish = (values: any) => {
    const player = {
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
      address_mac: null,
      is_status: false,
      is_win: false,
      is_active: false,
    };
    axios
      .post(managePlayer1, player)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListPokemon();
  }, []);

  return (
    <>
      {console.log(pokemonList)}
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
              <Col span={8}>
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
                <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
                  <Button htmlType="submit" className={"m-2"} style={{ marginRight: "20px" }}>
                    Đăng ký
                  </Button>
                </Form.Item>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Form>
    </>
  );
};

export default HomePage;
