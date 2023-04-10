import {Marker, MarkerClusterer} from "@react-google-maps/api";
import {useCallback, useMemo, useState} from "react";

import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import mapStyle from "../../../assets/css/Map.module.css";
import backgroundStyle from "../../../assets/css/Background.module.css";
import iconStyle from "../../../assets/css/Icon.module.css";
import textStyle from "../../../assets/css/Text.module.css";

import {Map} from "../../components/map/GoogleMap";


import EatryDetails from "./Details";
import compare from "../../../misc/compare";
import eateriesData from "../../../data/Eatries.json";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import FilterDropdown from "./Dropdown";


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
        menuCategory: [ "Lower in sugar", "Higher in wholegrains", "Lower in calories", "No added sugar", "Source of dietary fibre", "Eat 2+2 servings of fruits", "Vegetables daily" ]

    }), []);
    const [regions, setRegions] = useState([]);
    const [diningConcept, setDiningConcept] = useState([]);
    const [fnbSettings, setFNBSettings] = useState([]);
    const [type, setType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [filteredList, setFilteredList] = useState(eateriesData);
    const [selectedList, setSelectedList] = useState(null);


    const onFilter = useCallback(() => {
        setFilteredList(filteredList.filter((data) => {
            let typeStatus = true;
            let regionStatus = true;
            let fnbStatus = true;
            let diningStatus = true;
            let menuStatus = true;
            if (type.length)
                typeStatus = type.includes(data.category)
            if (regions.length)
                regionStatus = regions.includes(data.regions);
            if (fnbSettings.length)
                fnbStatus = fnbSettings.includes(data['fnb_settings']);
            if (diningConcept.length)
                diningStatus = diningConcept.includes(data['dining_concept']);
            if (menu.length)
                menuStatus = data['menu_item_endorsement'].map(item => menu.includes(item)).reduce((acc, curr) => acc || curr);
            return (typeStatus && regionStatus && fnbStatus && diningStatus && menuStatus)
        }))
    },[filteredList, regions]);

    return (
        <div className={`${backgroundStyle.default} d-grid`}>
            <div className="pt-5 my-auto mx-auto">
                <Stack gap={4}>
                    <Card className={`${mapStyle.filter} mx-auto`}>
                        <Card.Body className="d-grid justify-content-center">
                            <Card.Title className="mx-auto text-white">
                                Filter
                            </Card.Title>
                            <div className="d-flex flex-wrap justify-content-center">
                                <FilterDropdown name={"Health Category"} selected={menu} list={filterCategories.menuCategory}/>
                                <FilterDropdown name={"Food Type"} selected={type} list={filterCategories.typeCategory}/>
                                <FilterDropdown name={"Dining Guideline"} selected={diningConcept} list={filterCategories.diningConcept}/>
                                <FilterDropdown name={"Venue"} selected={fnbSettings} list={filterCategories.fnbSettings}/>
                                <FilterDropdown name={"Regions"} selected={regions} list={filterCategories.regions}/>
                            </div>
                            <div>
                                <Stack direction="horizontal" gap={3} className="justify-content-center">
                                    <Button variant="outline-primary" onClick={onFilter}>Apply</Button>
                                    <Button variant="outline-danger" onClick={() => {
                                        setMenu([])
                                        setType([])
                                        setDiningConcept([]);
                                        setFNBSettings([]);
                                        setRegions([])
                                        setFilteredList(eateriesData)
                                    }}>Reset</Button>
                                </Stack>

                            </div>
                        </Card.Body>
                    </Card>
                    <Stack direction="horizontal" gap={5} className="d-flex flex-wrap justify-content-center">
                        {selectedList !== null &&
                            <EatryDetails list={selectedList}/>
                        }
                        <Map>
                            <MarkerClusterer maxZoom={15}>
                                {(clusterer) => {
                                    return (
                                        filteredList.map((eateries, index) => {
                                            return (
                                                <Marker
                                                    key={index}
                                                    position={{lat: eateries.coordinates[0], lng: eateries.coordinates[1]}}
                                                    clusterer={clusterer}
                                                    // Quick Bypass
                                                    onClick={() =>
                                                        setSelectedList(filteredList
                                                            .filter((filtered) => compare(filtered.coordinates,eateries.coordinates))
                                                        )}
                                                >
                                                </Marker>
                                            )
                                        })
                                    )
                                    }}
                            </MarkerClusterer>
                        </Map>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}