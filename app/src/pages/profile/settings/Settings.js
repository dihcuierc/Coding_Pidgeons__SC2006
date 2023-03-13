import Button from 'react-bootstrap/Button';
import './Settings.css';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/esm/Stack';

export default function Settings() {
    return (
        <Card className= 'settingsbox'>
            <Stack direction="horizontal" gap={2}>
            <Stack gap={4}>
                <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Lets Go somewhere</Button>
                </Card.Body>
            </Stack>
            <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Lets Go somewhere</Button>
                </Card.Body>
                </Stack>
            </Card> 
    );
}