import {useState} from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import mapStyle from "../../../assets/css/Map.module.css";
import iconStyle from "../../../assets/css/Icon.module.css"


export default function EatryDetails({list}) {
    const [selected,setSelected] = useState(0);
    return (
    <Card className={`${mapStyle.display}`}>
        <Card.Body>
           <Form.Group className="mb-3">
               <Form.Select onChange={(e) =>  setSelected(e.target.value)}
               >
                   {list.map((item,index) => (
                       <option value={index} key={index}>{item.name_of_outlet}</option>
                       )
                   )}
               </Form.Select>
           </Form.Group>
            <div className="ms-2">
                <Card.Title className="mb-4">
                    {list[selected].brand_name}
                </Card.Title>
                <Row className="mb-3">
                    <Col>
                        <p>Location</p>
                    </Col>
                    <Col>
                        <Card.Text>
                            {list[selected].location}
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Category</p>
                    </Col>
                    <Col>
                        <Card.Text>
                            {list[selected].category}
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Type</p>
                    </Col>
                    <Col>
                        <Card.Text>
                            {list[selected].dining_concept}
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Mode</p>
                    </Col>
                    <Col>
                        <Card.Text>
                            {list[selected].fnb_settings}
                        </Card.Text>
                    </Col>
            </Row>
            <div className="mt-3">
                {list[selected].menu_item_endorsement.map((tag,index) => (
                    <Badge bg="primary" className="me-1" key={index}>{tag}</Badge>
                ))
                }
            </div>
        </div>
        </Card.Body>
    </Card>
    )
}