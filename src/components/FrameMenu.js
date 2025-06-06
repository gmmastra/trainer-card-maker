import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// menu for following inputs: frame type/color
export function FrameMenu(props) {

    //card appearance, by game
    const game = ['FireRed/LeafGreen', 'Ruby/Sapphire', 'Diamond/Pearl', 'Custom'];
    //card appearance colors, by game
    const colors = {
        'FireRed/LeafGreen': ['Blue', 'Brown', 'Gold', 'Green', 'Pink', 'Silver', 'Yellow'],
        'Ruby/Sapphire': ['Blue', 'Gold', 'Green', 'Moss', 'Pink', 'Red', 'Silver', 'Yellow'],
        'Diamond/Pearl': ['Red', 'Pink', 'Blue', 'Bronze', 'Silver', 'Gold', 'Black'],
        'Custom': ['Black', 'Blue', 'Green', 'Pink', 'Red', 'Yellow']
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //sets selected style and appropriate color list
    const handleGameChange = (e) => {
        const game = e.target.value;
        props.setSelectedGame(game);
        props.setAvailableColors(colors[game] || []);
        props.setSelectedColor('Select color');
        props.setCustom(false);
    };

    //sets selected color
    const handleColorChange = (e) => {
        props.setSelectedColor(e.target.value);
        props.setFrame(props.selectedGame.replace('/', '').toLowerCase() + '-' + e.target.value.toLowerCase());
        if (props.selectedGame === 'Custom') {
            props.setCustom(true);
        }
    };

    return (
        <>
            <div className='input-menu'>
                <h3>FRAME</h3>

                <div className='type'>
                    GAME:
                    <DropdownButton id="dropdown-basic-button" value={props.selectedGame} title={props.selectedGame} onSelect={(event, e) => handleGameChange(e)}>
                        {game.map((game, index) => (
                            <div key={index}>
                                <Dropdown.Item as='option' value={game}>{game}</Dropdown.Item>
                            </div>
                        ))}
                    </DropdownButton>
                    COLOR:
                    <DropdownButton id="dropdown-basic-button" value={props.selectedColor} title={props.selectedColor} onSelect={(event, e) => handleColorChange(e)}>
                        {props.availableColors.map((color, index) => (
                            <div key={index}>
                                <Dropdown.Item as='option' value={color}>{color}</Dropdown.Item>
                            </div>
                        ))}
                    </DropdownButton>
                </div>

                {/* handles frames with custom backgrounds */}
                {props.custom ? (<div className='custom-select'>
                    BACKGROUND IMAGE:
                    <button onClick={handleShow}>SELECT</button>
                </div>) : ('')}

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>UPLOAD IMAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    URL: <input value={''} />
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