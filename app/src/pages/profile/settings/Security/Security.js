import * as Yup from "yup"
import {Formik} from "formik";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Nav from "react-bootstrap/Nav";
import formStyle from "../../../../assets/css/Form.module.css";
import {UpdatePassword} from "../../../../provider/auth/AuthProvider";

export default function Security() {
    return (
                <div className={formStyle.register}>
                    <RegisterForm></RegisterForm>
                </div>
            
    )
}

function RegisterForm() {
    const schema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Current Password cannot be empty!"),
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
            onSubmit={values => {console.log(values)}}
            initialValues={{
                currentPassword: "",
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
                    <Form.Group className="mb-3" controlId="CurrentPassword">
                        <FloatingLabel
                            label="Current Password"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                placeholder="Password"
                                aria-describedby="passwordBlock"
                                value={values.currentPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.currentPassword && touched.currentPassword}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                tooltip>
                                {errors?.currentPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="NewPassword">
                        <FloatingLabel
                            label="New Password"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-describedby="passwordBlock"
                                values={values.password}
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
                    <Form.Group className="mb-3" controlId="NewPasswordAgain">
                        <FloatingLabel
                            label="New Password [again]"
                            className="text-dark">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Password"
                                aria-describedby="passwordBlock"
                                values={values.confirmPassword}
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
                    <div className="text-light d-flex justify-content-center m-3">
                        <Button variant="outline-light" type="submit" className="p-2 text-primary">Done</Button>
                        <LinkContainer to="/profile">
                            <Nav.Link>
                                <Button variant="outline-light" className="p-2 text-danger">Delete Account</Button>
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                </Form>
            )}

        </Formik>
    )
}