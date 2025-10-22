import React from "react";
import type { Task } from "../types/tasks";

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelect, onDelete, onToggle }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: "1px solid gray", margin: "8px 0", padding: "8px" }}>
          <h3
            onClick={() => onSelect(task)}
            style={{ cursor: "pointer", textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </h3>
          <p>{task.description}</p>
          <button onClick={() => onToggle(task.id)}>
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button onClick={() => onDelete(task.id)} style={{ marginLeft: "8px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;