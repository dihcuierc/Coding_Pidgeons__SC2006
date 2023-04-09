import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "./Settings.css";
import Account from "../../profile/settings/account/Account";
import Notifications from "../../profile/settings/notifications/Notifications";
import Security from "../../profile/settings/Security/Security"
import Card from 'react-bootstrap/Card';
import background from "../../../assets/css/Background.module.css";

function LeftTabsExample() {
  return (
    <div className={`${background.default} p-5`}>
    <Card className="card mx-auto col d-flex flex-wrap justify-content-center align-content-center bg-dark" style = {{paddingTop : "25px", width : "50%", borderRadius: '20px'}}> 
    <Card.Body className="col d-flex flex-wrap justify-content-center align-content-center" style={{border:'none'}}>
    <Tab.Container className="h-100" class = "ul.nav.nav-tabs" id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="h-100">
            <Nav.Item>
              <Nav.Link eventKey="first">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Notifications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Security</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>

            <Tab.Pane eventKey="first">          
            {<Account/>}
            </Tab.Pane>

            <Tab.Pane eventKey="second">           
            {<Notifications/>}
            </Tab.Pane>

            <Tab.Pane eventKey="third">           
            {<Security/>}
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Card.Body>
    </Card>
    </div>
  );
}


export default LeftTabsExample; 


