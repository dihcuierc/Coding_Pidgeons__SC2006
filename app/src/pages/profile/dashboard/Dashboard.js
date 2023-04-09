import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Tracker from "./Tracker/Tracker";
import Goals from "./goals/goals";
import History from "./History/History";
import BMI from "./BMI/ViewBMI";
import toast, {Toaster} from "react-hot-toast";

import background from "../../../assets/css/Background.module.css";


export default function Dashboard() {
    return (
        <>
           <div className={background.default}>
            <Container className="h-100 d-grid align-content-center" style={{paddingTop: '50px'}}>
                <Row className="p-0">
                    <Col>
                        <Tracker/>
                        <BMI/>
                    </Col>
                    <Col>
                        <History/>
                        <Goals/>
                    </Col>
                </Row>

            </Container>
            </div>
            
        </>
    )
}