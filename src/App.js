import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

function App() {
  const [info, setInfo] = useState({});
  const [title, setTitle] = useState("");
  const [titleInfo, setTitleInfo] = useState("");
  const [newUser, setNewUser] = useState({});

  const getInfoFromApi = async () => {
    const url = "https://randomuser.me/api/";
    try {
      const { data } = await axios(url);
      setInfo(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoFromApi();
    setTimeout(() => {
      document.querySelector("#name").click();
    }, 500);
  }, []);

  // console.log(info);

  const selectNew = () => {
    getInfoFromApi();
    setTimeout(() => {
      document.querySelector("#name").click();
    }, 400);
  };

  const whoName = () => {
    setTitle("name");
    const {
      name: { title, first, last },
    } = info;
    setTitleInfo(`${title} ${first} ${last}`);
  };

  const whoMail = () => {
    setTitle("email");
    setTitleInfo(info.email);
  };

  const whoAge = () => {
    setTitle("age");
    setTitleInfo(info.dob.age);
  };

  const whoAddress = () => {
    setTitle("address");
    const {
      location: { city, state, country },
    } = info;
    setTitleInfo(`${city} ${state} ${country}`);
  };

  const whoPhone = () => {
    setTitle("phone");
    setTitleInfo(info.phone);
  };

  const whoPass = () => {
    setTitle("password");
    setTitleInfo(info.login.password);
  };

  const addNewUser = () => {
    setNewUser({
      firstName: info.name.first,
      Email: info.email,
      phone: info.phone,
      age: info.dob.age,
    });
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={info?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{titleInfo}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onClick={whoName}
              id="name"
            >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onClick={whoMail}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onClick={whoAge}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onClick={whoAddress}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onClick={whoPhone}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password" onClick={whoPass}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={selectNew}>
              new user
            </button>
            <button className="btn" type="button" onClick={addNewUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr className="body-tr">
                <td className="td">{newUser?.firstName}</td>
                <td className="td">{newUser?.Email}</td>
                <td className="td">{newUser?.phone}</td>
                <td className="td">{newUser?.age}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
