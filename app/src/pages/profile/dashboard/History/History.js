import {VictoryBar, VictoryChart} from "victory";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"

import cardStyle from "../../../../assets/css/Card.module.css"
import textStyle from "../../../../assets/css/Text.module.css"

import historyData from "../../../../data/CaloriesHistory.json";
import {useCallback, useEffect, useState} from "react";
import {convertStringToDate} from "../../../../misc/dateConverter";
import {useAuth} from "../../../../provider/auth/AuthProvider";
export default function History() {

    const [axis,setAxis] = useState([]);
    const {user} = useAuth();
    
    const setData = useCallback(() => {
        setAxis(historyData.filter(item => item['userID'] === user.userID).map(item => {
            const x = convertStringToDate(item.date);
            const y = item['calories burnt'];
            return {x,y};
        }))
    },[user])

    useEffect(() => {
        setData();
    },[setData])

    return (
        <>
            <Card className={`${cardStyle.dashboard} bg-dark opacity-75`}>
                <Container className="d-flex mt-3">
                    <Card.Title className={textStyle.dashboard_title}> Daily Calories </Card.Title>
                </Container>
                <Card.Body className="d-flex justify-content-center">
                    <svg height={300} width={500}>
                        <VictoryChart
                            standalone={false}
                            theme={{axis: {style: {axis: {stroke: "white"}, tickLabels: {fill: "white"}, grid: { stroke: '#505050' }}}}}
                            height={300}
                            width={500}
                            domainPadding={30}
                            scale={{x: "time", y: "linear"}}
                            
                        >
                            <VictoryBar data={axis} style={{data: { fill: "tomato" }, }}
                                alignment="start"
                            />
                        </VictoryChart>
                    </svg>
                </Card.Body>
            </Card>
        </>
    )
}