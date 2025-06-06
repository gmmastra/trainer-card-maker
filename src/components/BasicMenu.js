import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bug from '../assets/types/bug.png'
import dark from '../assets/types/dark.png'
import dragon from '../assets/types/dragon.png'
import electric from '../assets/types/electric.png'
import fairy from '../assets/types/fairy.png'
import fight from '../assets/types/fight.png'
import fire from '../assets/types/fire.png'
import flying from '../assets/types/flying.png'
import ghost from '../assets/types/ghost.png'
import grass from '../assets/types/grass.png'
import ground from '../assets/types/ground.png'
import ice from '../assets/types/ice.png'
import normal from '../assets/types/normal.png'
import poison from '../assets/types/poison.png'
import psychic from '../assets/types/psychic.png'
import rock from '../assets/types/rock.png'
import steel from '../assets/types/steel.png'
import water from '../assets/types/water.png'
import neg from '../assets/types/null.png'

// menu for following inputs: name, friendcode, trainer type(s)
export function BasicMenu(props) {

    //trainer types
    const types = ['None', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fight', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water', '???'];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //prevent typing alphabetical characters
    function handleCode(e) {
        const re = /^[0-9\b -]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            props.setCode(e.target.value)
        }
    }

    return (
        <>
            <div className='input-menu'>
                <h3>BASICS</h3>
                <label>
                    NAME: <input value={props.name} onChange={e => props.setName(e.target.value)} />
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
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}