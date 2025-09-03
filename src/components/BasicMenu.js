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
    const gen1Files = ['Red_2', 'Agatha', 'Beauty', 'Biker', 'Bird_Keeper', 'Blackbelt', 'Blaine', 'Blue_1', 'Blue_2', 'Blue_3', 'Brock', 'Bruno', 'Bug_Catcher', 'Burglar', 'Channeler'];

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
    function importAll(r) {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '').replace('Spr_RG_', '').replace('Spr_GS_', '').replace('.png', '')] = r(item); });
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
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
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
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
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