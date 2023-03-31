import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import mapStyle from "../../../assets/css/Map.module.css";
import backgroundStyle from "../../../assets/css/Background.module.css";

import {Map} from "../../components/map/GoogleMap";

import eateriesData from "../../../data/Eatries.json";
import {Marker, MarkerClusterer} from "@react-google-maps/api";
import {useCallback, useMemo, useState} from "react";
import Button from "react-bootstrap/Button";


export default function Eateries() {
    /*
    * Static Implementation for Filtering List
    * This helps reduce the amount of memory and processing power
    * This list is then cached to prevent re-rendering of component
     */
    const filterCategories = useMemo(() => ({
        regions: [ "East", "West", "Central", "North-East", "North" ],
        diningConcept: [ "Non-Halal", "Halal" ],
        fnbSettings: [ "Hawker Centre", "Bakery", "Cafe", "Kiosk", "Restaurant", "Quick Service Restaurant/Fast Food", "Coffee Shop", "Dessert", "F&B on Digital Platform(s)" ],
        typeCategory: [ "Drinks", "Breads, cakes, cookies, pastries", "Western", "Desserts, Snacks & Kuehs", "Bubble Tea", "Chinese", "Fast Food", "Malay", "Thai", "Cut Fruit", "Japanese", "Korean", "Local Flavours", "Fusion", "Indian" ],
        menuCategory: [ "Lower in sugar", "", "Higher in wholegrains", "Lower in calories", "No added sugar", "Source of dietary fibre", "Eat 2+2 servings of fruits", "Vegetables daily" ]

    }), []);

    const [filteredList, setFilteredList] = useState(eateriesData);
    const [details, setDetails] = useState(null);

    const onFilter = useCallback(() => {
        setFilteredList(filteredList.filter((data) => data.dining_concept === "Non-Halal"))
    },[filteredList]);

    const onClick = useCallback(() => {

    },[])

    return (
        <div className={`${backgroundStyle.default} d-grid`}>
            <div className="pt-5 my-auto mx-auto">
                <Stack gap={2}>
                    <Stack direction="horizontal" gap={5} className="d-flex flex-wrap justify-content-center">
                        <Card className={mapStyle.display}>
                        </Card>
                        <Map>
                            <MarkerClusterer maxZoom={14}>
                                {(clusterer) =>
                                    filteredList.map((eateries) => {
                                        return (
                                            <Marker
                                                key={eateries.name_of_outlet}
                                                position={{lat: eateries.coordinates[0], lng: eateries.coordinates[1]}}
                                                clusterer={clusterer}
                                            />
                                        )
                                    })
                                }
                            </MarkerClusterer>
                        </Map>
                    </Stack>
                    {details !== null &&
                    <Card className={`mb-5 ${mapStyle.details} mx-auto`}>
                        <div className="mt-3">
                            <h3 className="d-flex justify-content-center text-black-50 mb-1">Eateries Details</h3>
                        </div>
                        <Card.Body></Card.Body>
                    </Card>
                    }
                </Stack>
            </div>
        </div>
    )
}