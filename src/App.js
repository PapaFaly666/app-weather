import { ChakraProvider, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import './App.css';
import { color } from "framer-motion";
function App() {
  const [temp, setTemp] = useState(null);
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [searchValue, setSearchValue] = useState("Ziguinchor");
  const [humidity, setHumidity] = useState("");
  const [preci, setPreci] = useState("");
  const champModifie = (event) => {
    setSearchValue(event.target.value);
  };

  const handlerSubmitted = (event) => {
    event.preventDefault();
    const keyApi = "f93c12f5c51c38326550709ec063c6db";
    const lang = "fr";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${keyApi}&lang=${lang}&units=metric`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.main && data.main.temp && data.weather && data.weather[0]) {
          setTemp(data.main.temp);
          setDesc(data.weather[0].main);
          setIcon(data.weather[0].icon);
          setHumidity(data.main.humidity);
          setPreci(data.main.pressure);
          setIsReady(true);
        } else {
          console.error("Données météorologiques incomplètes");
        }
      })
  };



 return(
  <div>
    <ChakraProvider>
    <div className="container">
      <div className="contenu">
        <form onSubmit={handlerSubmitted}>
          <Input placeholder='Entrer la ville' size='md' onChange={champModifie} value={searchValue} />
          <Button type="submit" colorScheme='teal' variant='ghost' className="btnSearch">Rechercher</Button>
        </form>
          
      </div>

      <div className="boxInfo" >
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="imgIcon"/>
        <p className="desc"><strong>{desc}</strong></p>
        <h1 className="tempVille">{temp}°C</h1>
        <h1 className="villeName">{searchValue}</h1>
        <div className="footerInfo">
            <h2><strong>Hum: </strong><strong>{humidity}%</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <h2><strong>Précip: </strong><strong>{preci} Km/h</strong> </h2>
        </div>
      </div>
    </div>
    </ChakraProvider>
  </div>
 );}
 export default App;