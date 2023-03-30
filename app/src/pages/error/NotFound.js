import React from "react";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import iconStyle from  "../../assets/css/Icon.module.css";
import background from "../../assets/css/Background.module.css"
import errorPic from "../../assets/images/icons/404Pic.svg"



export default function NotFound() {
    document.title = "404 Error Page";
    return (
        <div className={background.error}>
            <Container className="d-flex">
                <Stack gap={4} className="align-items-center text-center">
                    <Image fluid src={errorPic} className={iconStyle.error} alt="Error Picture"></Image>
                        <h3 className="fw-bold">404 Error - Page Not Found</h3>
                        <h5>The Page You Requested Could Not Be Found!</h5>
                    <LinkContainer to="/facilities">
                        <Nav.Link>
                            <Button className="text-light border-2 px-3">Home</Button>
                        </Nav.Link>
                    </LinkContainer>
                </Stack>
            </Container>
        </div>
    )
}