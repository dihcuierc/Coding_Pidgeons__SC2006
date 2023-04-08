// # Routing
import {Outlet, useLocation} from "react-router-dom";

//# React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image"

// #React Boostrap Routing Components
import LinkContainer from "react-router-bootstrap/LinkContainer";


// #Custom CSS
import "./Navbar.css";
import iconStyle from "../../../../assets/css/Icon.module.css";

// #Icon
import {AccountCircleRounded} from "@mui/icons-material";

import {useAuth} from "../../../../provider/auth/AuthProvider";


const noSidebarNonLoginRoutes = ["/login","/register"];

export default function NavigationBar() {
    const {user} = useAuth();
    const {pathname} = useLocation();

    const noSideBars = noSidebarNonLoginRoutes.some((item) => pathname.includes(item));

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
                {noSideBars ? null : <NavigationToggle user={user}/>}
            </Container>
        </Navbar>
        <Outlet/>
    </>
    )
}

function NavigationToggle({user}) {
    return(
    <>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
                <LinkContainer to="/workout">
                    <Nav.Link className="mx-3">Workout</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/facilities/exercise">
                    <Nav.Link className="mx-3">Exercise Facilities</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/facilities/eateries">
                    <Nav.Link className="mx-3">Hungry Go Where?</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
            {Object.keys(user).length ? <ProfileToggle user={user}/> : <SignSidebar/>}
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
                    <Button size="sm" variant="outline-primary" className="text-light">Sign in</Button> {' '}
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link>
                    <Button size="sm" variant="outline-secondary" className="text-light">Sign Up</Button>{' '}
                </Nav.Link>
            </LinkContainer>
        </>
    )
}

function ProfileToggle({user}) {
    return (
        <>
            <LinkContainer to="/profile">
                <Nav.Link active={false}>
                    <div className="d-flex">
                        {user?.profileImage === "" ? <AccountCircleRounded className={iconStyle.navbar}/> :
                            <Image roundedCircle width={30} height={30} src={user?.profileImage} alt={user?.name}/>
                        }

                        <div className="m-1 px-1 small">{user.username}</div>
                    </div>
                </Nav.Link>
            </LinkContainer>
        </>
    )
}