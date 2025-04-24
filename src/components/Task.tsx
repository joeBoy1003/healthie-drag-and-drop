import React from "react";
import { useDrag } from "react-dnd";
import { TaskProps } from "../types";

const TaskComponent: React.FC<TaskProps> = ({task}) => {
    const [{isDragging}, drag] = useDrag({
        type: "Task",
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const dragRef = (node: HTMLDivElement | null) => {
        if(node) {
            drag(node);
        }
    };

    return (
        <div 
            ref={dragRef} 
            className={`py-2 my-2 bg-white shadow-md rounded ${isDragging ? 'opacity-50' : ''}`}
        >
            {task.title}
        </div>
    );
};

export default TaskComponent;