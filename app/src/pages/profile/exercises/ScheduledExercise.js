import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/LocationOn";
import DateIcon from "@mui/icons-material/CalendarToday"
import TimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from '@mui/icons-material/MoreVert';


import background from "../../../assets/css/Background.module.css";
import buttonStyle from "../../../assets/css/Button.module.css";
import cardStyle from "../../../assets/css/Card.module.css";
import rowStyle from "../../../assets/css/Row.module.css";
import textStyle from "../../../assets/css/Text.module.css";

import {collection, onSnapshot} from "firebase/firestore";
import {initializeFirebase} from "../../../provider/FirebaseConfig";
import {DeleteDoc, GetCollection} from "../../../provider/firestore/FirestoreProvider";
import {useAuth} from "../../../provider/auth/AuthProvider";
import DeleteIcon from "@mui/icons-material/Delete";

const {db} = initializeFirebase();
export default function ViewExercises() {
    const navigate = useNavigate();
    const [scheduledExercises, setScheduledExercises] = useState([]);
    const [planTitle, setPlanTitle] = useState([]);
    const {user} = useAuth();

    const getPlans = useCallback(() => {
        GetCollection("Plan").then(plans => {
            setPlanTitle(plans.map(plan => plan.title))
        })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        const scheduledRef = collection(db,"ScheduleExercise");
        if (!planTitle.length) {
          getPlans();
        }
        const unsub = onSnapshot(scheduledRef, (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            const planID = doc.data().planID;
            return ({...doc.data(), plan: planTitle[planID-1], id: doc.id});
          });
          const sortedDocs = docs.sort((a, b) => {
            if (a.date === b.date) {
              return a['start time'].localeCompare(b['start time']);
            }
            return a.date.localeCompare(b.date);
          });
          setScheduledExercises(sortedDocs);
        });
        return () => unsub();
      }, [planTitle.length, getPlans]);

    return (
        <div className={`${background.default} p-5`}>
            <Card className={`${cardStyle.schedule} mx-lg-auto bg-dark opacity-75`}>
                <Card.Title className={textStyle.dashboard_title}>Scheduled Exercises</Card.Title>
                <Card.Body style={{color: 'white'}}>
                    {scheduledExercises.filter(item => item['userID'] === user.userID).map((item) => (
                        <Row className={rowStyle.exercises}>
                            <Col className="p-3">
                                <div className="d-flex">
                                    <MapIcon color="error" fontSize="large" />
                                    <Card.Text style={{fontSize: '20px'}} >{item.plan}</Card.Text>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex mb-3">
                                    <DateIcon className="me-2"/>
                                    <Card.Text>{item.date}</Card.Text>
                                </div>
                                <div className="d-flex">
                                    <TimeIcon className="me-2"/>
                                    <Card.Text>{item['start time']} - {item['end time']}</Card.Text>
                                </div>
                            </Col>
                            <Col xs={1} className="mt-auto d-flex justify-content-end">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu size="sm" variant="dark" className="w-100"> 
                                    <Dropdown.Item>
                                        <Button className={`${buttonStyle.transparent} ms-auto`}
                                            onClick={() => {
                                                navigate(`/workout/schedule/${item.id}`, {
                                                    state: {
                                                        exercise: item
                                                    }
                                                })
                                            }}>
                                        <EditIcon sx={{marginRight: '10px'}}/>
                                        Edit
                                     </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button className={`${buttonStyle.transparent} ms-auto`}
                                            onClick={() => {
                                                DeleteDoc("ScheduleExercise",item.id).catch(err => console.log(err));
                                            }}>
                                            <DeleteIcon sx={{marginRight: '10px'}}/>
                                            Delete
                                        </Button>
                                    </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {<MoreVertIcon  sx={{ color: '#ffffff' }} />}
      {children}
    </a>
  ));