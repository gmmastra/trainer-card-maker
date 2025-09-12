import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TeamMember from "./TeamMember.js";

//menu for following inputs: team and team order 
//draggable dnd-kit team list heavily referenced from @kurniawanc
//https://medium.com/@kurniawanc/create-sortable-drag-and-drop-in-react-js-using-dnd-kit-library-ba8b2917a6b5
export function TeamMenu(props) {

    const [newMember, setNewMember] = useState('');
    const [state, setState] = useState({
        selectPokemon: [],
        url: '',
        name: ''
    });

    useEffect(() => {
        getPokemon();
    }, []);

    // fetches list of pokemon names from api endpoint
    async function getPokemon() {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = res.data.results;

        const pokemon = data.map(d => ({
            value: d.name,
            label: d.name
        }));
        setState({ selectPokemon: pokemon });
    }

    // fetches sprite of pokemon with given name 
    async function getSprite(e) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e}`);
        const data = res.data.results;
        props.setSpriteList([...props.spriteList, res.data.sprites.front_default]);
    }

    // adds selected pokemon to team
    const handleChange = e => {
        if (e != null) {
            setNewMember(e.value);
            const index = props.team.indexOf(e.value);
            if (index < 0 && props.team.length < 6) {
                props.setTeam([...props.team, e.value]);
                getSprite(e.value);
            }
        }
    };

    // changes team order based on updated drag-and-drop order
    const reorderTeam = (e) => {
        if (!e.over) return;

        if (e.active.id !== e.over.id) {
            props.setTeam((team) => {
                const oldIndex = props.team.indexOf(e.active.id.toString());
                const newIndex = props.team.indexOf(e.over.id.toString());
                props.setTeamOrder(arrayMove(props.team, oldIndex, newIndex));
                props.setSpriteList(arrayMove(props.spriteList, oldIndex, newIndex));
                return arrayMove(props.team, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className='input-menu'>
            <h3>TEAM</h3>

            <div className='team-select'>
                <Select
                    options={state.selectPokemon}
                    onChange={handleChange}
                    placeholder="Search..."
                    isClearable={true}
                    value={newMember}
                />
            </div>

            <DndContext onDragEnd={reorderTeam}>
                <ul>
                    <SortableContext items={props.team}>
                        {props.team.map((pokemon) => (
                            <TeamMember key={pokemon}
                                pokemon={pokemon}
                                team={props.team} setTeam={props.setTeam} setTeamOrder={props.setTeamOrder}
                                spriteList={props.spriteList} setSpriteList={props.setSpriteList} >{pokemon}</TeamMember>
                        ))}
                    </SortableContext>
                </ul>
            </DndContext>
        </div >
    );
}