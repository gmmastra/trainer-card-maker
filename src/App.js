import React, { useState } from 'react';
import './App.css';
import { FaGithub } from "react-icons/fa";
import { BasicMenu } from "./components/BasicMenu";
import { FrameMenu } from "./components/FrameMenu";
import { TeamMenu } from './components/TeamMenu';
import { CardArea } from "./components/CardArea";
import { BadgeMenu } from './components/BadgeMenu';

function App() {

  const [trainerName, setTrainerName] = useState('');
  const [trainerCode, setTrainerCode] = useState('');
  const [trainerType1, setTrainerType1] = useState('None');
  const [trainerType2, setTrainerType2] = useState('None');
  const [trainerSprite, setTrainerSprite] = useState('');

  const [cardFrame, setCardFrame] = useState('default');
  const [cardCustomBG, setCardCustomBG] = useState('');
  const [selectedGame, setSelectedGame] = useState('Select game');
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('Select color');
  const [custom, setCustom] = useState(false);

  const [team, setTeam] = useState([]);
  const [teamOrder, setTeamOrder] = useState([]);
  const [spriteList, setSpriteList] = useState([]);

  const [badgeList, setBadgeList] = useState([]);

  //resets all user inputs
  function cardReset() {
    setTrainerName('');
    setTrainerCode('');
    setTrainerType1('None');
    setTrainerType2('None');
    setTrainerSprite('');
    setCardFrame('default');
    setCardCustomBG('');
    setSelectedGame('Select game');
    setSelectedColor('Select color');
    setAvailableColors([]);
    setCustom(false);
    setTeam([]);
    setTeamOrder([]);
    setSpriteList([])
    setBadgeList([]);
    var w = document.getElementsByTagName('input');
    for (var i = 0; i < w.length; i++) {
      if (w[i].type === 'checkbox') {
        w[i].checked = false;
      }
    }
  }

  return (
    <div className="App">
      <div className='header'>
        <a href='https://github.com/gmmastra' target='_blank' rel="noreferrer"><FaGithub /></a>
        <p>POKEMON TRAINER CARD MAKER</p>
      </div>

      <div className='maker'>

        {/* handles user inputs */}
        <div className="menu">
          <BasicMenu
            name={trainerName} setName={setTrainerName}
            code={trainerCode} setCode={setTrainerCode}
            type={trainerType1} setType={setTrainerType1}
            type2={trainerType2} setType2={setTrainerType2}
            setTrainerSprite={setTrainerSprite}
          />
          <FrameMenu
            setFrame={setCardFrame}
            customBG={cardCustomBG} setCustomBG={setCardCustomBG}
            selectedGame={selectedGame} setSelectedGame={setSelectedGame}
            selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            availableColors={availableColors} setAvailableColors={setAvailableColors}
            custom={custom} setCustom={setCustom}
          />
          <TeamMenu
            team={team} setTeam={setTeam}
            setTeamOrder={setTeamOrder}
            spriteList={spriteList} setSpriteList={setSpriteList}
          />
          <BadgeMenu
            badgeList={badgeList} setBadgeList={setBadgeList} />
        </div>

        {/* displays card preview and download/reset options */}
        <div className='card-area'>
          <CardArea
            reset={cardReset}
            cardFrame={cardFrame}
            cardCustomBG={cardCustomBG}
            name={trainerName} friendcode={trainerCode}
            trainerType1={trainerType1} trainerType2={trainerType2}
            trainerSprite={trainerSprite}
            team={teamOrder}
            spriteList={spriteList}
            badgeList={badgeList}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
