import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import Tracker from "../../components/dashboard/Tracker";
import Goals from "../../components/dashboard/goals/ViewGoals";
import Stats from "../../components/dashboard/Stats";
import BMI from "../../components/dashboard/ViewBMI";
import background from "../../../assets/css/Background.module.css";


export default function Dashboard() {
    return (
        <>
           <div className={background.default}>
            <Container className="h-100 d-grid align-content-center">
            
                <Stack direction="horizontal" gap={4}>
                    <Stack gap={4}>
                        <Tracker/>
                        <BMI/>
                    </Stack>
                    <Stack gap={4}>
                        <Stats/>
                        <Goals/>
                    </Stack>
                </Stack>
                
            </Container>
            </div>
            
        </>
    )
}