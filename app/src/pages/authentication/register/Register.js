import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup"
import {Formik} from "formik";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import formStyle from "../../../assets/css/Form.module.css";
import buttonStyle from "../../../assets/css/Button.module.css";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css"

import {StatusMessages} from "../../components/utilities/alerts/StatusMessages";
import {SignUp} from "../../../provider/auth/auth";


export default function RegisterWrapper() {
    return (
        <div className={`${background.login } d-flex`}>
            <Container className={padding.heading}>
                <h2 className="text-light mx-3 mx-sm-0">
                    Welcome to <b>Train</b>Together!
                </h2>
                <div className={formStyle.register}>
                    <Register></Register>
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

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const schema = Yup.object().shape({
        displayName: Yup.string().required("No username provided!")
            .min(6, "Username is too short - a minimum of 6 characters.")
            .matches(/^\S*$/,
                "Username must not contain spaces"),
        name: Yup.string().required("No name provided!"),
        email: Yup.string().email('Invalid email address').required("No email provided!"),
        password: Yup.string().required("No password provided!")
            .min(8, "Password is too short - a minimum of 8 characters.")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one Uppercase, Lowercase, one number and special character"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],"Passwords must match")
            .required("No password provided!")
    })
    return (
        <Formik
            validationSchema={schema}
            onSubmit={async values => {
                try {
                const uid = await SignUp(values.email,values.password);
                navigate("./setup", {
                    state : {
                        user: {
                            uid: uid,
                            name: values.name,
                            username: values.displayName,
                            email: values.email,
                        }
                    }
                })
                } catch (err) {
                    setError(err);
                }
            }}
            initialValues={{
                displayName: "",
                name: "",
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
                    <Form.Group className="mb-3" controlId="displayNameInput">
                        <FloatingLabel className="text-dark" label="Username">
                            <Form.Control
                                type="text"
                                placeholder="John"
                                name="displayName"
                                value={values.displayName}
                                onChange={handleChange}
                                isInvalid={!!errors.displayName && touched.displayName}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.displayName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nameInput">
                        <FloatingLabel className="text-dark" label="Name">
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name && touched.name}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.name}
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
                    <Form.Group className="mb-3" controlId="confirmPasswordInput">
                        <FloatingLabel
                            label="Confirm Password"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
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
                    </div>
                    <div className="d-grid gap-2 pt-2 mt-2">
                        <Button
                            className={buttonStyle.auth}
                            type="submit"
                        ><h3>Register</h3></Button>
                    </div>
                    {error !== null && <StatusMessages error={error}/>}
                </Form>
            )}

        </Formik>
    )
}