import React from "react";
import { AddFormProps } from "../types";

const AddForm: React.FC<AddFormProps> = ({input, onAddTask, onChange}) => {
    return (
        <form onSubmit={onAddTask} className='mb-4'>
            <input
                type='text'
                placeholder='Add a new task'
                className='border border-gray-300 rounded p-2 mr-2'
                value={input}
                onChange={onChange}
            />
            <button
                type='submit'
                className={`bg-blue-500 text-white rounded p-2 ${input.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={input.length === 0}
            >
                Add Task
            </button>
        </form>
    );
};

export default AddForm;