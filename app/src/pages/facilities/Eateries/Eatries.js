import { Marker, MarkerClusterer} from "@react-google-maps/api";
import {Link} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import mapStyle from "../../../assets/css/Map.module.css";
import backgroundStyle from "../../../assets/css/Background.module.css";
import iconStyle from "../../../assets/css/Icon.module.css";
import textStyle from "../../../assets/css/Text.module.css";

import {Map} from "../../components/map/GoogleMap";
import eateriesData from "../../../data/Eatries.json";

export default function Eateries() {
    return (
        <div className={`${backgroundStyle.default} d-grid`}>
            <div className="pt-5 my-auto mx-auto">
                <Stack direction="horizontal" gap={5} className="d-flex flex-wrap justify-content-center">
                    <Card className={mapStyle.display}>
                        <div className="mt-3">
                            <h3 className="d-flex justify-content-center text-black-50 mb-1">Park Details</h3>
                        </div>
                    </Card>
                    <Map>
                    </Map>
                </Stack>
            </div>
        </div>
    )
}