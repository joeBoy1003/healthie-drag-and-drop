export type Task = {
    id: number;
    title: string;
};

export interface TaskProps {
    task: Task;
    progress: "todo" | "doing" | "done";
    onDrop: (task: Task, progress: string) => void;
};