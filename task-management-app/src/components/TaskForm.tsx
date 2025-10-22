import React, { useState } from "react";
import type { Task } from "../types/tasks";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState<Task>({ id: Date.now(), title: "", description: "", completed: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ id: Date.now(), title: "", description: "", completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Task title" value={task.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;