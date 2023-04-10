import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import paddingStyle from "../../../assets/css/Padding.module.css"
import buttonStyle from "../../../assets/css/Button.module.css"

export default function FilterDropdown({name,list, selected}) {
    return (
    <Dropdown className="me-3 mb-3" autoClose>
        <Dropdown.Toggle className={buttonStyle.dropdown} id="dropdown-autoclose">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Form.Check type="checkbox">
                {list.map((item, index) => {
                    return (
                        <div className={paddingStyle.dropdown} key={index}>
                            <Col className="mb-2 ms-2">
                                <Form.Check.Input type="checkbox" onChange={(e) => {
                                    console.log(item)
                                    e.target.checked ?
                                        selected.push(item) :
                                        selected.splice(index, index+1)
                                }}/>
                                <Form.Check.Label className="ms-1">{item}</Form.Check.Label>
                            </Col>
                        </div>
                    )}
                )}
            </Form.Check>
        </Dropdown.Menu>
    </Dropdown>
    )
}