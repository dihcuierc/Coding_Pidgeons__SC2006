import {Formik} from "formik";
import * as Yup from "yup";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import formStyle from "../../../assets/css/Form.module.css";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css"

import { ResetPassword } from "../../../provider/auth/AuthProvider";
import {useState} from "react";
import {StatusMessages} from "../../components/alerts/StatusMessages";

export default function ForgetWrapper() {
    return(
        <div className={`${background.login } d-flex`}>
            <div className={`${padding.heading} mx-auto`}>
                <div className={formStyle.forget}>
                    <h2 className="text-black mb-4 text-center">
                        Forgot your password?
                    </h2>
                    <Forget></Forget>
                </div>
            </div>
        </div>
    )
}

function Forget() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const schema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required()
    });
    return (
    <Formik
        validationSchema={schema}
            onSubmit={async values => {
                try {
                    await ResetPassword(values.email)
                    setMessage("A password reset link have been send to your email.");
                } catch(err) {
                    setError(err);
                }
            }}
            initialValues={{
                email: ''
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
                <div className="d-grid gap-2 pt-2 mt-2">
                    <Button
                        className="btn btn-dark "
                        type="submit"
                    ><h3>Send email</h3></Button>
                </div>
                {message !== null ?
                    <StatusMessages message={message}/> :
                    error !== null && <StatusMessages error={error}/> }
            </Form>
        )}
    </Formik>
)
}