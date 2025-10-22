import React, { useState } from "react";
import type { Task } from "../types/tasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated, user } = useAuth0();

  const handleAdd = (newTask: Task) => setTasks([...tasks, newTask]);
  const handleEdit = (id: number, newDescription: string) => {
    setTasks(tasks.map(task => 
        task.id === id ? { ...task, description: newDescription }: task
    ));
  }
  const handleDelete = (id: number) => setTasks(tasks.filter((t) => t.id !== id));

  if (!isAuthenticated) {
    return (
      <Container className="text-center mt-5">
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <h2 className="mb-4">Welcome to Task Manager</h2>
            <p className="text-muted mb-4">
              Manage your daily tasks efficiently. Please log in to continue.
            </p>
            <LoginButton />
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm p-3">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0">{user?.name}'s Dashboard</h3>
                <small className="text-muted">{user?.email}</small>
              </div>
              <LogoutButton />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={5}>
          <Card className="shadow-sm p-3">
            <Card.Title>Add New Task</Card.Title>
            <TaskForm onSubmit={handleAdd} />
          </Card>
        </Col>
        <Col md={7}>
          <Card className="shadow-sm p-3">
            <Card.Title>Your Tasks</Card.Title>
            <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;