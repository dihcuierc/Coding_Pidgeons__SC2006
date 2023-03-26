import * as Yup from "yup"
import {Formik} from "formik";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import formStyle from "../../assets/css/Form.module.css";
import buttonStyle from "../../assets/css/Button.module.css";
import background from "../../assets/css/Background.module.css";
import padding from "../../assets/css/Padding.module.css"

export default function Register() {
    return (
        <div className={`${background.login } d-flex`}>
            <Container className={padding.heading}>
                <h2 className="text-light mx-3 mx-sm-0">
                    Welcome to <b>Train</b>Together!
                </h2>
                <div className={formStyle.register}>
                    <RegisterForm></RegisterForm>
                    <div className="text-light d-flex justify-content-center m-3">
                        <b>Already have an account?</b>
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <b className="p-2 text-danger">Log in</b>
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                </div>
            </Container>
        </div>
    )
}

function RegisterForm() {
    const schema = Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email('Invalid email address').required("Required"),
        password: Yup.string().required("No password provided")
            .min(8, "Password is too short - aj minimum of 8 characters.")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one Uppercase, Lowercase, one number and special character"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],"Passwords must match")
            .required("No password provided")
    })
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors
            }) => (
                <Form onSubmit={handleSubmit} className="text-light ms-3 ms-sm-2">
                    <Row>
                    <Form.Group as={Col} className="mb-3" controlId="fNameInput">
                        <FloatingLabel className="text-dark" label="First Name">
                            <Form.Control
                                type="text"
                                placeholder="John"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName && touched.firstName}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.firstName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="lNameInput">
                        <FloatingLabel className="text-dark" label="Last Name">
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName && touched.lastName}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.lastName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="emailInput">
                        <FloatingLabel className="text-dark" label="Email Address">
                            <Form.Control
                                type="email"
                                placeholder="example@placeholder.com"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email && touched.email}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.email}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordInput">
                        <FloatingLabel
                            label="Password"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-describedby="passwordBlock"
                                onChange={handleChange}
                                isInvalid={!!errors.password && touched.password}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                tooltip>
                                {errors?.password}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPasswordInput">
                        <FloatingLabel
                            label="Password"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Password"
                                aria-describedby="passwordBlock"
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                tooltip>
                                {errors?.confirmPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <div className="d-flex justify-content-center text-muted">
                        OR
                    </div>
                    <div className="d-grid gap-2 pt-2 mt-2">
                        <Button variant="outline-secondary">
                            Continue with Singpass
                        </Button>
                        <Button
                            className={buttonStyle.auth}
                            type="submit"
                        ><h3>Register</h3></Button>
                    </div>
                </Form>
            )}

        </Formik>
    )
}