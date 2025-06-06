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
        id: '',
        name: ''
    });

    const [newMember, setNewMember] = useState('new');

    useEffect(() => {
        getPokemon();
    }, []);

    async function getPokemon() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = res.data;

        const pokemon = data.map(d => ({
            value: d.id,
            label: d.name
        }));
        setState({ selectPokemon: pokemon });
    }

    function handleChange(e) {
        const index = props.team.indexOf(newMember);
        if (index < 0) {
            props.setTeam([...props.team, newMember]);
        }
    }

    const reorderTeam = (e) => {
        if (!e.over) return;

        if (e.active.id !== e.over.id) {
            props.setTeam((team) => {
                const oldIndex = props.team.indexOf(e.active.id.toString());
                const newIndex = props.team.indexOf(e.over.id.toString());
                props.setTeamOrder(arrayMove(props.team, oldIndex, newIndex));
                return arrayMove(props.team, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className='input-menu'>
            <h3>TEAM</h3>

            <div>
                <Select
                    options={state.selectPokemon}
                    onChange={(event, e) => handleChange(e)}
                    placeholder="Search..."
                    isClearable={true}
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