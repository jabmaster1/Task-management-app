import React, { useState } from "react";
import type { Task } from "../types/tasks";
import { Button, Form } from "react-bootstrap";

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, newDescription: string) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setNewDescription(task.description || "");
  };

  const handleSaveClick = (id: number) => {
    onEdit(id, newDescription);
    setEditingTaskId(null);
    setNewDescription("");
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{task.title}</div>

              {editingTaskId === task.id ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="mt-2"
                />
              ) : (
                <span>{task.description}</span>
              )}
            </div>

            <div>
              {editingTaskId === task.id ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleSaveClick(task.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditingTaskId(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;