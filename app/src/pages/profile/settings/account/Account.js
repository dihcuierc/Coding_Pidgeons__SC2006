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
import {useAuth} from "../../../../provider/auth/AuthProvider";
import {UpdateCollection} from "../../../../provider/firestore/FirestoreProvider";

export default function UpdateProfile() {
    return (
            
                <div className={formStyle.register}>
                    <RegisterForm></RegisterForm>
                </div>
            
    )
}

function RegisterForm() {
    const { user } = useAuth();
    const schema = Yup.object().shape({
        username: Yup.string().required("No username provided!")
            .min(6, "Username is too short - a minimum of 6 characters.")
            .matches(/^\S*$/,
                "Username must not contain spaces"),
        email: Yup.string().email('Invalid email address').required("Required"),
        mobile: Yup.string().matches(/(6|8|9)\d{7}/, "Phone number is not valid"),
    })
    return (
        <Formik
            validationSchema={schema}
            enableReinitialize
            onSubmit={async (values) => {
                console.log(user)
            }}
            initialValues={{
                username: user?.username,
                email: user?.email,
                mobile: user?.mobile
            }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                resetForm
            }) => (
                <Form onSubmit={handleSubmit} onReset={resetForm} className="text-light ms-3 ms-sm-2">
    
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
                    <Form.Group as={Col} className="mb-3" controlId="mobileInput">
                        <FloatingLabel className="text-dark" label="Mobile Number">
                            <Form.Control
                                type="text"
                                placeholder="12345"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                isInvalid={!!errors.mobile && touched.mobile}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.mobile}
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
                    <div className="text-light d-flex justify-content-center m-3">
                        <Button type="submit" variant="outline-light" className="p-2 text-primary">Done</Button>
                        <Button type="reset" variant="outline-light" className="p-2 text-danger ms-3">Cancel</Button>
                    </div>
                </Form>
            )}

        </Formik>
    )
}