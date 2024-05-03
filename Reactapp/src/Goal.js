import React, { useState } from 'react';
import { Container, Row, Col, ProgressBar, Button, Form, Modal } from 'react-bootstrap';
import './Goal.css'; // Import the CSS file

const Goal = () => {
    const [goals, setGoals] = useState([
        { id: 1, name: 'Save for a Car', progress: 60 },
        { id: 2, name: 'Invest £5000 in S&P 500', progress: 20 },
        { id: 3, name: 'Save for Roof extension', progress: 30 },
        { id: 4, name: 'Complete Holiday fund', progress: 40 },  // basic initial goals
        { id: 5, name: 'Christmas presents', progress: 80 }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalProgress, setNewGoalProgress] = useState(0);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddGoal = () => {
        // Check if both fields are not empty before adding the goal
        if (newGoalName.trim() !== '' && newGoalProgress.trim() !== '') {
            const newGoal = {
                id: goals.length + 1,
                name: newGoalName,
                progress: parseInt(newGoalProgress) || 0
            };
            setGoals([...goals, newGoal]);
            handleCloseModal();
            setNewGoalName('');
            setNewGoalProgress(0);
        } else {
            alert('Please fill in both fields before adding the goal.');
        }
    };

    const handleAdd10PercentProgress = (goalId) => {   // Updates the progress of the goal with the given ID
        setGoals(goals.map(goal => {
            if (goal.id === goalId) {
                return { ...goal, progress: Math.min(goal.progress + 10, 100) };   // makes sure that the progress does not exceed 100
            }
            return goal;
        }));
    };

    const handleRemoveGoal = (goalId) => {       // Function which removes a goal
        setGoals(goals.filter(goal => goal.id !== goalId));
    };

    return (     // Render the actual Goal component UI
        <>
            <Container>
                <h1>Goal Pages</h1>
                <Row>
                    <Col md={12}>
                        <img src="https://media.istockphoto.com/id/1423550966/vector/profit-rounded-lines-icon.jpg?s=612x612&w=0&k=20&c=_KFEK2PUIlquKGVUYQ18I2rO6xQ3ieFDEx-xHpXRLTI=" alt="Goal Visualization" className="goals-image" />
                        <h2>Your Financial Goals</h2>
                        <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                            Add New Goal
                        </Button>
                        {goals.map((goal) => (
                            <div key={goal.id} className="mb-3">
                                <p>{goal.name}</p>
                                <ProgressBar now={goal.progress} label={`${goal.progress}%`} />
                                <Button
                                    variant="success"
                                    className="mt-2 me-2"
                                    onClick={() => handleAdd10PercentProgress(goal.id)}>
                                    Add 10% Progress
                                </Button>
                                <Button
                                    variant="danger"
                                    className="mt-2"
                                    onClick={() => handleRemoveGoal(goal.id)}>
                                    Complete
                                </Button>
                            </div>
                        ))}
                    </Col>
                </Row>


                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a New Goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGoalName">
                                <Form.Label>Goal Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter goal"
                                    value={newGoalName}
                                    onChange={e => setNewGoalName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGoalProgress">
                                <Form.Label>Goal Progress (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter initial progress"
                                    value={newGoalProgress}
                                    onChange={e => setNewGoalProgress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddGoal}>
                            Save Goal
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

            <footer className="App-footer mt-auto py-3 text-center">
                <p className="mb-0">&copy; 2024 Financial Assistant. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Goal;
