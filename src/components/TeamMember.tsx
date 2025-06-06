import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { RxHamburgerMenu } from "react-icons/rx";

interface IGameItem {
  children: string;
}

const TeamMember: FC<IGameItem> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.children });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition
      }}
    >
      <div className='team-member'>
        <RxHamburgerMenu style={{ margin: '0px 10px' }} /> {props.children}
      </div>
    </div>
  );
};

export default TeamMember;