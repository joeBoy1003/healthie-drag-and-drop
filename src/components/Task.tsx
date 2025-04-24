import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Task, TaskProps } from "../types";

const TaskComponent: React.FC<TaskProps> = ({task, progress, onDrop}) => {
    const [{isDragging}, drag] = useDrag({
        type: "Task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "Task",
        drop: (item: Task) => onDrop(item, progress),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const dragDropRef = (node: HTMLDivElement | null) => {
        if(node) drag(drop(node));
    };

    return (
        <div 
            ref={node => dragDropRef(node)} 
            className={`p-2 m-2 border rounded ${isDragging ? 'opacity-50' : ''}`}
        >
            {task.title}
        </div>
    );
};

export default TaskComponent;