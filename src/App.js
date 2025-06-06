import React, { useState } from 'react';
import './App.css';
import { SiKofi } from "react-icons/si";
import { BasicMenu } from "./components/BasicMenu";
import { FrameMenu } from "./components/FrameMenu";
import { TeamMenu } from './components/TeamMenu';
import { CardArea } from "./components/CardArea";

function App() {

  const [trainerName, setTrainerName] = useState('');
  const [trainerCode, setTrainerCode] = useState('');
  const [trainerType1, setTrainerType1] = useState('None');
  const [trainerType2, setTrainerType2] = useState('None');
  const [trainerSprite, setTrainerSprite] = useState('');

  const [cardFrame, setCardFrame] = useState('');
  const [cardCustomBG, setCardCustomBG] = useState('');
  const [selectedGame, setSelectedGame] = useState('Select game');
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('Select color');
  const [custom, setCustom] = useState(false);

  const [team, setTeam] = useState([]);
  const [teamOrder, setTeamOrder] = useState([]);

  //resets all user inputs
  function cardReset() {
    setTrainerName('');
    setTrainerCode('');
    setTrainerType1('None');
    setTrainerType2('None');
    setTrainerSprite('');
    setCardFrame('');
    setCardCustomBG('');
    setSelectedGame('Select game');
    setSelectedColor('Select color');
    setAvailableColors([]);
    setCustom(false);
    setTeam([]);
    setTeamOrder([]);
  }

  return (
    <div className="App">
      <div className='header'>
        <a href='https://ko-fi.com/rizsnt' target='_blank' rel="noreferrer"><SiKofi /></a>
        <p>POKEMON TRAINER CARD MAKER</p>
      </div>

      <div className='maker'>
        {teamOrder}
        {/* handles user inputs */}
        <div className="menu">
          <BasicMenu
            name={trainerName} setName={setTrainerName}
            code={trainerCode} setCode={setTrainerCode}
            type={trainerType1} setType={setTrainerType1}
            type2={trainerType2} setType2={setTrainerType2}
          />
          <FrameMenu
            setFrame={setCardFrame}
            setCustomBG={setCardCustomBG}
            selectedGame={selectedGame} setSelectedGame={setSelectedGame}
            selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            availableColors={availableColors} setAvailableColors={setAvailableColors}
            custom={custom} setCustom={setCustom}
          />
          <TeamMenu
            team={team} setTeam={setTeam}
            setTeamOrder={setTeamOrder}
          />
        </div>

        {/* displays card preview and download/reset options */}
        <div className='card-area'>
          <CardArea
            reset={cardReset}
            cardFrame={cardFrame} setCardFrame={setCardFrame}
            cardCustomBG={cardCustomBG} setCardCustomBG={setCardCustomBG}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
