import {VictoryLabel, VictoryPie} from "victory";

import Card from "react-bootstrap/Card";

import dashboardStyle from "../../../../assets/css/Dashboard.module.css"
import textStyle from "../../../../assets/css/Text.module.css"

export default function Tracker() {
    return (
        <>
            <Card className={dashboardStyle.card}>
                <Card.Title className="mx-auto mt-3">Calories Burnt</Card.Title>
                <Card.Body className="d-flex justify-content-center">
                    <svg height={300} width={300} viewBox="50 50 50 50" className={dashboardStyle.graph}>
                    <VictoryPie
                        standalone={false}
                        innerRadius={21}
                        cornerRadius={30}
                        data={[400,800]}
                        labels={() => null}
                        colorScale={["transparent", "red"]}
                        height={150}
                        width={150}
                                />
                    <VictoryLabel
                        textAnchor="middle"
                        text="800/1200 kcal"
                        style={{fontSize: 7}}
                        x={75}
                        y={75}
                        />
                    </svg>
                </Card.Body>
            </Card>
        </>
    )
}
