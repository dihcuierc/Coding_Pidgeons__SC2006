import * as Yup from "yup"
import {Formik} from "formik";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import formStyle from "../../../../assets/css/Form.module.css";
import {useAuth} from "../../../../provider/auth/AuthProvider";
import {UpdatePassword,checkPassword, DeleteUser} from "../../../../provider/auth/auth";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

export default function Security() {
    return (
            <div className={formStyle.register}>
                <RegisterForm></RegisterForm>
                <Toaster/>
            </div>
    )
}

function RegisterForm() {
    const [show, setShow] = useState(false);
    const handleClose = useCallback(() => 
        setShow(false),[]);
    const handleShow = useCallback(() => setShow(true),[])
    const {user} = useAuth();

    const success = useCallback(() => toast.success("You have successfully updated your password"),[]);
    const updateFail = useCallback(() => toast.error("Password unable to update"),[]);

    const schema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Current Password cannot be empty!"),
        password: Yup.string().required("No password provided")
            .min(8, "Password is too short - a minimum of 8 characters.")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one Uppercase, Lowercase, one number and special character")
            .notOneOf([Yup.ref('currentPassword'),null], "Password cannot match current password!")
        ,
        confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],"Passwords must match")
            .required("No password provided")
    })
    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    await checkPassword(user.email, values.currentPassword);
                    const status = await UpdatePassword(values.password);
                    status ?
                        success() :
                    updateFail();
                } catch (err) {
                    const error = () => toast.error(err.message);
                    error();
                }
            }}
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
                        <Button type="submit" className="p-2 ms-3">Done</Button>
                        <Button variant="danger" className="p-2 ms-3" onClick={() => {
                            handleShow();
                        }}>Delete Account</Button>
                    </div>
                    <DeleteModal show={show} handleClose={handleClose} handleShow={handleShow}/>
                </Form>
            )}

        </Formik>
    )
}

function DeleteModal(props) {
    const navigate = useNavigate();
    const {setUser} = useAuth();
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        DeleteUser().catch(err => console.log(err));
                        setUser({});
                        navigate("/");
                    }}>Delete Account</Button>
                    <Button variant="info" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}