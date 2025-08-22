import React, { CSSProperties, useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TeamMember from "./TeamMember.tsx";

//menu for following inputs: team and team order 
//draggable dnd-kit team list heavily referenced from @kurniawanc
//https://medium.com/@kurniawanc/create-sortable-drag-and-drop-in-react-js-using-dnd-kit-library-ba8b2917a6b5
export function TeamMenu(props) {

    const [state, setState] = useState({
        selectPokemon: [],
        url: '',
        name: ''
    });

    const [data, setData] = useState([]);

    const [newMember, setNewMember] = useState('');

    useEffect(() => {
        getPokemon();
    }, []);

    async function getPokemon() {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = res.data.results;

        const pokemon = data.map(d => ({
            value: d.name,
            label: d.name
        }));
        setState({ selectPokemon: pokemon });
    }

    async function getSprite(e) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e}`);
        const data = res.data.results;
        props.setSpriteList([...props.spriteList, res.data.sprites.front_default]);
    }

    const handleChange = e => {
        setNewMember(e.value);
        const index = props.team.indexOf(e.value);
        const spriteIndex = data;
        if (index < 0) {
            props.setTeam([...props.team, e.value]);
            getSprite(e.value);
        }
    };

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
                            <TeamMember key={pokemon}>{pokemon}</TeamMember>
                        ))}
                    </SortableContext>
                </ul>
            </DndContext>
        </div >
    );
}