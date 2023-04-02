import Card from "react-bootstrap/Card";

import cardStyle from "../../../../../assets/css/Card.module.css"
import iconStyle from "../../../../../assets/css/Icon.module.css"

import AddIcon from "@mui/icons-material/AddCircleOutlined";
import {Link} from "react-router-dom";

export default function AddCard() {
    return (
        <div>
            <Card className={cardStyle.exercise}>
                <Card.Body className="mx-auto d-flex align-items-center">
                    <Link to="plans/add">
                        <AddIcon className={iconStyle.card}/>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}