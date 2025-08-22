import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxHamburgerMenu } from "react-icons/rx";

const TeamMember = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.children });

  const [showMember, setShowMember] = React.useState(true);

  function handleRemove(e) {
    const index = props.team.indexOf(props.pokemon);
    const newTeam = [...props.team.slice(0, index), ...props.team.slice(index + 1)];
    const newSpriteList = [...props.spriteList.slice(0, index), ...props.spriteList.slice(index + 1)];
    props.setTeam(newTeam);
    props.setTeamOrder(newTeam);
    props.setSpriteList(newSpriteList);
    setShowMember(false);
  };

  return (
    <div>
      {
        showMember ? <div
          id={props.pokemon
          }
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            transform: CSS.Transform.toString(transform),
            transition: transition
          }
          }
        >
          <div className="team-member">
            <RxHamburgerMenu style={{ margin: "0px 10px" }} /> {props.children}
            <button onMouseDown={handleRemove}>X</button>
          </div>
        </div > : null}
    </div>
  );
};

export default TeamMember;
