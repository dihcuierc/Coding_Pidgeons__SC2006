import {ERRORCODE} from "./FirebaseErrorCode";
import {Alert} from "react-bootstrap";

function StatusMessages({error, message}) {
    if (message) {
        return (
            <Alert className="pb-0 mt-3 bg-transparent text-success border-success">
                <p>{message}</p>
            </Alert>
        )
    }
    else if (error){
        return (
            <ErrorMessages error={error}/>
        )
    }
}



function ErrorMessages({error}) {
    const code = error.code;
    let description;
    switch (code) {
        case ERRORCODE.WrongPassword:
            description = "The password you have entered was incorrect.";
            break;
        case ERRORCODE.TooManyAttempts:
            description = "Access to this account has been temporarily disabled due to many failed login attempt."
            break;
        case ERRORCODE.EmailExists:
        case ERRORCODE.EmailInUse:
            description = "Email has been used. Please register with another email or login with existing account."
            break;
        case ERRORCODE.InvalidUser:
            description = "Account have not been registered. Please register first!"
            break;
        default:
            description = error.message;
            break;
    }
    return (
        <Alert className="pb-0 mt-3 bg-transparent text-danger border-danger">
            <p>{description}</p>
        </Alert>
    )
}


export {StatusMessages}