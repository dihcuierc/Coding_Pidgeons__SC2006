import Card from "react-bootstrap/Card";
import './ViewBMI.css';
import Stack from "react-bootstrap/Stack";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function BMI() {
    return (
        <>
            <Card className="bg-dark opacity-75">
                <Stack direction="horizontal" gap={4}>
                    <Stack gap={4}>
                    <Card.Title className="text-white"> BMI Calculator </Card.Title>
                    </Stack>
                    <Stack gap={4}>
                    <DropdownButton
                        id="dropdown-button-dark-example2"
                        variant="secondary"
                        menuVariant="dark"
                        title="This Week"
                        className="mt-2">
                        <Dropdown.Item href="#/action-1">Last Week</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Last Month</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Last Year</Dropdown.Item>
                    </DropdownButton>
                    </Stack>
                </Stack>   
                <Card.Body>
                    <Stack direction="horizontal" gap={4}>
                        <Stack gap={4}>
                            <Card.Body className="height-card">
                                <Stack direction="horizontal" gap={4}>
                                    <Stack gap={4}>
                                        <Card.Body>Height</Card.Body>
                                    </Stack>
                                    <Stack gap={4}>
                                        <Card.Body>value</Card.Body> 
                                    </Stack>
                                </Stack>   
                            </Card.Body>                        
                            <Card.Body className="weight-card">
                                <Stack direction="horizontal" gap={4}>
                                    <Stack gap={4}>
                                        <Card.Body>Weight</Card.Body>
                                    </Stack>
                                    <Stack gap={4}>
                                        <Card.Body>value</Card.Body> 
                                    </Stack>
                                </Stack>   
                            </Card.Body>
                        </Stack>
                        <Stack gap={4}>
                            <Card bg='secondary'>
                            <Card.Title>Body Mass Index (BMI)</Card.Title>
                            <Card.Body className="calculator-card">
                                <Stack direction="horizontal" gap={4}>
                                    <Stack gap={4}>
                                        <Card.Body>Value</Card.Body>
                                    </Stack>
                                    <Stack gap={4}>
                                        <Card.Body className='healthy'>Healthy</Card.Body>
                                    </Stack>
                                </Stack> 
                                <p>scale</p>  
                            </Card.Body>
                            </Card>
                        </Stack>
                    </Stack>
                </Card.Body>
            </Card>
        </>
    )
}