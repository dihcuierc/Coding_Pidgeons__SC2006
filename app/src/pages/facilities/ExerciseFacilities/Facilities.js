import {Marker, MarkerClusterer} from "@react-google-maps/api";
import {useState} from "react";
import {Link} from "react-router-dom";

import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge"

import MapIcon from "@mui/icons-material/LocationOn";
import TimeIcon from "@mui/icons-material/AccessTime";
import WebIcon from "@mui/icons-material/Public";

import backgroundStyle from "../../../assets/css/Background.module.css"
import mapStyle from "../../../assets/css/Map.module.css";
import textStyle from "../../../assets/css/Text.module.css";

import {Map} from "../../components/map/GoogleMap"
import data from "../../../data/Parks.json";

export default function Facilities() {
    const parks = data.features;
    const [details, setDetails] = useState(null);
    return (
        <div className={`${backgroundStyle.default} d-grid`}>
            <div className="pt-5 my-auto mx-auto">
                <Stack direction="horizontal" gap={5} className="d-flex flex-wrap justify-content-center">
                    <Card className={mapStyle.display}>
                        <div className="mt-3">
                            <h3 className="d-flex justify-content-center text-black-50 mb-1">Park Details</h3>
                        </div>
                        {details !== null &&
                        <Card.Body className="p-5">
                            <Card.Title className="display-6">
                                {details.Name}
                            </Card.Title>
                            <Card.Subtitle className="small ms-2 text-black-50">
                                {details.ADDRESSSTREETNAME}
                            </Card.Subtitle>
                            <div>
                                <div className="d-flex pt-4">
                                    <MapIcon color="success" fontSize="large" className="me-3"/>
                                    <Card.Text className="my-auto">
                                        {details.ADDRESSPOSTALCODE}
                                    </Card.Text>
                                </div>
                                <div className="d-flex">
                                    <TimeIcon color="primary" fontSize="large" className="me-3"/>
                                    <div className="d-flex mt-1">
                                        {details.OpeningHours === "24h" ? <Card.Text className="text-success me-2">Open</Card.Text> : <Card.Text className="text-danger me-2">Closed</Card.Text>}
                                        {details.OpeningHours}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <WebIcon color="secondary" fontSize="large" className="me-3"/>
                                    <Card.Text className="my-auto">
                                        <Link to={details.HYPERLINK} className={`${textStyle.hoverline}`}> NPark Website</Link>
                                    </Card.Text>
                                </div>
                                <div className="mt-5">
                                    {details.TAG.map((tag) => (
                                        <Badge bg="primary" className="me-1">{tag}</Badge>
                                    ))
                                    }
                                </div>
                            </div>
                        </Card.Body>
                        }
                    </Card>
                    <Map>
                        <MarkerClusterer>
                            {(clusterer) =>
                                parks.map((park) => (
                                    <Marker
                                        key={park.properties.Name}
                                        position={{lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0]}}
                                        clusterer={clusterer}
                                        onClick={() => setDetails(park.properties) }
                                    />
                                ))
                            }
                        </MarkerClusterer>
                    </Map>
                </Stack>
            </div>
        </div>
    )
}