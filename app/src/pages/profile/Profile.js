import Tab from "react-bootstrap/Tab"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import background from "../../assets/css/Background.module.css"

import Dashboard from "../profile/dashboard/Dashboard";
import Friends from "../profile/friends/Friends";
import Settings from "../profile/settings/Settings"
import Reviews from "../review/ViewReviews"


import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile() {
    return (
        
        <Tab.Container
            variant="pills"
            id="sideBarTabs"
            defaultActiveKey="dashboard">
            <Row className="me-0" >
                <Col sm={1} md={1} className="my-auto p-3" >
                    <Nav variant="pills" className="flex-column" >
                        <Nav.Item>
                            <Nav.Link eventKey="dashboard"><DashboardIcon/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="reviews"><ReviewsIcon/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="settings"><SettingsIcon/></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Logout"><LogoutIcon/></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10} md={11}>
                    <Tab.Content className="h-100">
                        <Tab.Pane eventKey="dashboard" className="h-100">
                            <Dashboard/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="friends">
                            <Friends/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews">
                            <Reviews/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="settings">
                            <Settings/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="logout">
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
