import * as React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// menu for following inputs: name, friendcode, trainer type(s), trainer sprite
export function BasicMenu(props) {

    // trainer types
    const types = ['None', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fight', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water', 'Null'];

    // gen 1/2 sprite file names
    const gen1Files = ['Agatha', 'Beauty', 'Biker', 'Bird_Keeper', 'Blackbelt', 'Blaine', 'Blue_1', 'Blue_2', 'Blue_3', 'Brock', 'Bruno', 'Bug_Catcher', 'Burglar', 'Channeler', 'Cooltrainer_F', 'Cooltrainer_M', 'Cue_Ball', 'Engineer', 'Erika', 'Fisherman', 'Gambler', 'Gentleman', 'Giovanni', 'Hiker', 'Jr_Trainer_F', 'Jr_Trainer_M', 'Juggler', 'Koga', 'Lance', 'Lass', 'Lorelei', 'Lt_Surge', 'Misty', 'Oak', 'PokéManiac', 'Psychic', 'Red_1', 'Red_2', 'Rocker', 'Rocket', 'Sabrina', 'Sailor', 'Scientist', 'Super_Nerd', 'Swimmer', 'Tamer', 'Youngster'];
    const gen2Files = ['Beauty', 'Biker', 'Bird_Keeper', 'Blackbelt', 'Blaine', 'Blue', 'Boarder', 'Brock', 'Bruno', 'Bug_Catcher', 'Bugsy', 'Burglar', 'Camper', 'Chuck', 'Clair', 'Cooltrainer_F', 'Cooltrainer_M', 'Erika', 'Ethan', 'Falkner', 'Firebreather', 'Fisher_JP', 'Gentleman', 'Guitarist', 'Hiker', 'Janine', 'Jasmine', 'Juggler', 'Karen', 'Kimono_Girl', 'Koga', 'Lance', 'Lass', 'Lt_Surge', 'Medium_JP', 'Misty', 'Morty', 'Oak', 'Officer', 'Picnicker', 'Pokéfan_M', 'Pokéfan_F', 'PokéManiac', 'Pryce', 'Psychic', 'Red', 'Rocket_Executive_F', 'Rocket_Executive_M', 'Rocket_Grunt_M', 'Rocket_Grunt_F', 'Sabrina', 'Sage_JP', 'Sailor', 'Schoolboy', 'Scientist', 'Silver_1', 'Silver_2', 'Skier', 'Super_Nerd', 'Swimmer_F_JP', 'Swimmer_M', 'Teacher', 'Twins', 'Whitney', 'Will', 'Youngster'];
    const gen3Files = ['Anabel', 'Archie', 'Aroma_Lady', 'Battle_Girl', 'Beauty', 'Bird_Keeper', 'Birch', 'Black_Belt', 'Brandon', 'Brawly', 'Brendan', 'Bug_Catcher', 'Bug_Maniac', 'Camper', 'Collector', 'Cooltrainer_F', 'Cooltrainer_M', 'Dragon_Tamer', 'Drake', 'Expert_F', 'Expert_M', 'Fisherman', 'Flannery', 'Gentleman', 'Glacia', 'Greta', 'Guitarist', 'Hex_Maniac', 'Hiker', 'Interviewer', 'Juan', 'Kindler', 'Lady', 'Lass', 'Lucy', 'Matt', 'Maxie', 'May', 'Ninja_Boy', 'Noland', 'Norman', 'Old_Couple', 'Parasol_Lady', 'Phoebe', 'Picnicker', 'Pokéfan_F', 'Pokéfan_M', 'PokéManiac', 'Pokémon_Breeder_F', 'Pokémon_Breeder_M', 'Pokémon_Ranger_F', 'Pokémon_Ranger_M', 'Psychic_F', 'Psychic_M', 'Rich_Boy', 'Roxanne', 'Ruin_Maniac', 'Sailor', 'School_Kid_F', 'School_Kid_M', 'Shelly', 'Sidney', 'Spenser', 'Steven', 'Tabitha', 'Team_Aqua_Grunt_F', 'Team_Aqua_Grunt_M', 'Team_Magma_Grunt_F', 'Team_Magma_Grunt_M', 'Tuber_F', 'Tuber_M', 'Tucker', 'Wallace', 'Wally', 'Wattson', 'Winona', 'Youngster'];

    // shows/hides sprite selection modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => { setValue(newValue); };

    // prevent typing alphabetical characters
    function handleCode(e) {
        const re = /^[0-9\b -]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            props.setCode(e.target.value.substring(0, 12))
        }
    }

    // sets trainer sprite based on selected
    const handleTrainer = (e) => { props.setTrainerSprite(e.target.alt); }

    // imports all trainer sprites from their respective folders
    const gen1 = importAll(require.context('../assets/trainers/1/', false, /\.(png)$/));
    const gen2 = importAll(require.context('../assets/trainers/2/', false, /\.(png)$/));
    const gen3 = importAll(require.context('../assets/trainers/3/', false, /\.(png)$/));
    function importAll(r) {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '').replace('Spr_RG_', '').replace('Spr_GS_', '').replace('Spr_RS_', '').replace('.png', '')] = r(item); });
        return images;
    }

    return (
        <>
            <div className='input-menu'>
                <h3>BASICS</h3>
                <label>
                    NAME: <input value={props.name} onChange={e => props.setName(e.target.value.substring(0, 20))} />
                </label>
                <label>
                    FRIENDCODE: <input value={props.code} onChange={e => handleCode(e)} />
                </label>

                <div className='type'>
                    TRAINER TYPE 1:
                    <DropdownButton id="dropdown-basic-button" title={props.type} onSelect={(event, e) => props.setType(e.target.value)}>
                        {types.map((type, index) => (
                            <div key={index}>
                                <Dropdown.Item as='option' value={type}>{type}</Dropdown.Item>
                            </div>
                        ))}
                    </DropdownButton>
                    TRAINER TYPE 2:
                    <DropdownButton id="dropdown-basic-button" title={props.type2} onSelect={(event, e) => props.setType2(e.target.value)}>
                        {types.map((type, index) => (
                            <div key={index}>
                                <Dropdown.Item as='option' value={type}>{type}</Dropdown.Item>
                            </div>
                        ))}
                    </DropdownButton>
                </div>

                <div className='sprite'>
                    SPRITE:
                    <button onClick={handleShow}>SELECT</button>
                </div>
                <br />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SELECT SPRITE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}
                                    slotProps={{ indicator: { sx: { backgroundColor: '#002966' }, }, }}
                                    sx={{ '& .Mui-selected': { border: '1px solid #002966', color: '#002966 !important' } }}
                                >
                                    <Tab label="GEN 1" value="1" />
                                    <Tab label="GEN 2" value="2" />
                                    <Tab label="GEN 3" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div className='trainer-sprite-list'>
                                    {gen1Files.map((sprite, index) => (
                                        <img alt={`1/Spr_RG_${sprite}`} src={gen1[sprite]} onClick={e => handleTrainer(e)} />
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div className='trainer-sprite-list'>
                                    {gen2Files.map((sprite, index) => (
                                        <img alt={`2/Spr_GS_${sprite}`} src={gen2[sprite]} onClick={e => handleTrainer(e)} />
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="3">
                                <div className='trainer-sprite-list'>
                                    {gen3Files.map((sprite, index) => (
                                        <img alt={`3/Spr_RS_${sprite}`} src={gen3[sprite]} onClick={e => handleTrainer(e)} />
                                    ))}
                                </div>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}