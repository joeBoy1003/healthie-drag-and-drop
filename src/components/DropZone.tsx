import React, { useCallback } from "react";
import { DropZoneProps, Task } from "../types";
import TaskComponent from "./Task";
import { useDrop } from "react-dnd";

const DropZone: React.FC<DropZoneProps> = ({ progress, onDrop, tasks }) => {
    const [, drop] = useDrop({
        accept: "Task",
        drop: (item: Task) => onDrop(item, progress),
    });

    const dropRef = useCallback((node: HTMLDivElement | null) => {
        if(node) {
            drop(node);
        }
    }, [drop]);

    return (
        <div ref={dropRef} className="w-1/3 bg-gray-200 p-4 rounded">
            <h2 className="text-md text-left font-semibold mb-2">{progress.toUpperCase()}</h2>
            {
                tasks.map((task) => (
                    <TaskComponent
                        key={task.id} 
                        task={task} 
                    />
                ))
            }
        </div>
    );
};

export default DropZone;