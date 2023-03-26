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
import formStyle from "../../../../assets/css/Form.module.css";
import buttonStyle from "../../../../assets/css/Button.module.css";
import background from "../../../../assets/css/Background.module.css";
import padding from "../../../../assets/css/Padding.module.css"

export default function UpdateProfile() {
    return (
            
                <div className={formStyle.register}>
                    <RegisterForm></RegisterForm>
                    <div className="text-light d-flex justify-content-center m-3">
                        <LinkContainer to="/profile">
                            <Nav.Link>
                                <b className="p-2 text-danger">Done</b>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/profile">
                            <Nav.Link>
                                <b className="p-2 text-danger">Cancel</b>
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                </div>
            
    )
}

function RegisterForm() {
    const schema = Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        
        email: Yup.string().email('Invalid email address').required("Required"),
        password: Yup.string().required("No password provided")
            .min(8, "Password is too short - a minimum of 8 characters.")
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
                username: "",
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
    
                    <Form.Group as={Col} className="mb-3" controlId="UserNameInput">
                        <FloatingLabel className="text-dark" label="User Name">
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username && touched.username}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.username}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="MnumberInput">
                        <FloatingLabel className="text-dark" label="Mobile Number">
                            <Form.Control
                                type="text"
                                placeholder="12345"
                                name="mobile number"
                                value={values.Mnumber}
                                onChange={handleChange}
                                isInvalid={!!errors.Mnumber && touched.Mnumber}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.Mnumber}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>                    
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
                </Form>
            )}

        </Formik>
    )
}