import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Expenses.css'; // Import the CSS file for styling
import ExpenseCalculator from './ExpenseCalculator';

const Expenses = () => {
    return (
        <>
            <Container className="expenses-container">
                <h1 className="text-center my-4">Financial Advice Resources</h1>
                <Row>
                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src="https://smartmoneypeople.com/uploads/avatars/brands/1020.jpg" /> 
                            <Card.Body>
                                <Card.Title>Money saving expert</Card.Title>
                                <Card.Text>
                                    MoneySavingExpert.com is a British consumer finance information and discussion website, founded by financial journalist Martin Lewis in February 2003.
                                </Card.Text>
                                <Card.Link href="https://www.moneysavingexpert.com/">Visit Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src="https://data.bloomberglp.com/company/sites/51/2019/08/og-image-generic-lp.png" />
                            <Card.Body>
                                <Card.Title>Bloomberg</Card.Title>
                                <Card.Text>
                                    Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.
                                </Card.Text>
                                <Card.Link href="https://www.bloomberg.com/uk">Visit Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src="https://gcs.civilservice.gov.uk/wp-content/uploads/2020/06/HMG_logo.png" />
                            <Card.Body>
                                <Card.Title>Retirement Advice</Card.Title>
                                <Card.Text>
                                    When planning your pension and retirement income you might need help with.
                                </Card.Text>
                                <Card.Link href="https://www.gov.uk/plan-retirement-income/get-financial-advice">Visit Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src="https://media.newyorker.com/photos/628d2a485ffc2a133c607721/16:9/w_1280,c_limit/Cassidy-Stock-Market.jpg" />
                            <Card.Body>
                                <Card.Title>Wall Street Stocks</Card.Title>
                                <Card.Text>
                                    U.S. STOCKS; Nasdaq Composite, 15630.78, -144.87; S&P 500, 4975.51, -30.06; DJ Total Stock Market, 49613.48, -339.33; Russell 2000, 2004.14, -28.60.
                                </Card.Text>
                                <Card.Link href="https://www.wsj.com/market-data/stocks">Visit Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


            <ExpenseCalculator/>

            <footer className="App-footer mt-auto py-3 text-center">
                <p className="mb-0">&copy; 2024 Financial Assistant. All rights reserved.</p>
            </footer>
        </>
    );
}

export default Expenses;
