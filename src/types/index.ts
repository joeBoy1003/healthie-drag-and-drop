export enum Progress {
    TODO = "todo",
    DOING = "doing",
    DONE = "done",
};

export type Task = {
    id: number;
    title: string;
}

export interface TaskProps {
    task: Task;
};

export interface DropZoneProps {
    onDrop: (task: Task, progress: Progress) => void;
    progress: Progress;
    tasks: Task[];
};

export interface DragDropResult {
    newSource: Task[];
    newTarget: Task[];
};