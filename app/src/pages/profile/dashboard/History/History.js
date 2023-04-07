import {VictoryBar, VictoryChart} from "victory";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"

import cardStyle from "../../../../assets/css/Card.module.css"


export default function History() {

    return (
        <>
            <Card className={`${cardStyle.dashboard}`}>
                <Container className="d-flex mt-3">
                    <Card.Title className="mx-auto ps-5 mt-1"> Daily Calories </Card.Title>
                </Container>
                <Card.Body className="d-flex justify-content-center">
                    <svg height={300} width={500}>
                        <VictoryChart
                            standalone={false}
                            height={300}
                            width={500}
                            domainPadding={30}
                            scale={{x: "time", y: "linear"}}
                        >
                            <VictoryBar data={[
                                {x: new Date(2023,3,27),y: 400 },
                                {x: new Date(2023,3,28),y: 200 },
                                {x: new Date(2023,3,29),y: 600 },
                                {x: new Date(2023,3,30),y: 500 },
                                {x: new Date(2023,3,31),y: 200 },
                                {x: new Date(2023,4,1),y: 100 },
                            ]}
                                alignment="start"
                            />
                        </VictoryChart>
                    </svg>
                </Card.Body>
            </Card>
        </>
    )
}