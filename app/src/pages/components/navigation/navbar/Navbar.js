// # Routing
import {Outlet, useLocation} from "react-router-dom";

//# React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";

// #React Boostrap Routing Components
import LinkContainer from "react-router-bootstrap/LinkContainer";

// #Custom CSS Module
import pic from "../../../../assets/css/Pic.module.css"

// #Custom CSS
import "./Navbar.css";
import profileIcon from "../../../../assets/images/icons/profile.svg"

const noSidebarNonLoginRoutes = ["/login","/register"];
const profileSidebarRoutes = ["/workout"]

export default function NavigationBar() {
    const {pathname} = useLocation();

    const noSideBars = noSidebarNonLoginRoutes.some((item) => pathname.includes(item));

    const profileSideBars = profileSidebarRoutes.some((item) => pathname.includes(item));

    return (
    <>
        <Navbar collapseOnSelect bg="darkblue" expand="lg" variant="dark">
            <Container fluid className="mx-2 mx-sm-5">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <b>Train</b>
                        Together
                    </Navbar.Brand>
                </LinkContainer>
                {noSideBars ? null : <NavigationToggle Sidebar={profileSideBars}/>}
            </Container>
        </Navbar>
        <Outlet/>
    </>
    )
}

function NavigationToggle({Sidebar}) {
    return(
    <>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
                <LinkContainer to="/workout">
                    <Nav.Link className="mx-3">Workout</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/facilities">
                    <Nav.Link className="mx-3">Exercise Facilities</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/eateries">
                    <Nav.Link className="mx-3">Hungry Go Where?</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
            {Sidebar ? <ProfileToggle/> : <SignSidebar/>}
            </Nav>
        </Navbar.Collapse>
    </>
)
}

function SignSidebar() {
    return (
        <>
            <LinkContainer to="/login">
                <Nav.Link>
                    <Button variant="outline-primary" className="text-light">Sign in</Button> {' '}
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link>
                    <Button variant="outline-secondary" className="text-light">Sign Up</Button>{' '}
                </Nav.Link>
            </LinkContainer>
        </>
    )
}

function ProfileToggle() {
    return (
        <>
            <LinkContainer to="/profile">
                <Nav.Link active={false}>
                    <div className="d-flex">
                        <Image roundedCircle={true} src={profileIcon} className={`${pic.profile} border`}></Image>
                        <div className="m-1 px-1 small">John Doe</div>
                    </div>
                </Nav.Link>
            </LinkContainer>
        </>
    )
}