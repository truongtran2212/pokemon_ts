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
            src={listTeam1[1].pokemon.sprites.other.home.front_default}
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
            src={listTeam1[2].pokemon.sprites.other.home.front_default}
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
    <h1 className="detail-name" style={{ fontWeight: 500, color: "#fff" }}>
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
            // src={listTeam1[0].pokemon.sprites.versions.generation}
            // src={player1.sprites.other.home.front_default}
            // src={player1.sprites.other.home.front_shiny}
            alt="pokemon"
            className="detail-img box avatar"
            style={{ height: 150, width: 230 }}
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
</section>;
