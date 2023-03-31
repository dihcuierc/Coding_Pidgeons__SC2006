import {Autocomplete} from "@react-google-maps/api";
import {useCallback, useRef} from "react";

import mapStyle from "../../../../assets/css/Map.module.css";

export default function Searchbox({mapRef}) {
    const searchResultRef = useRef(Autocomplete);

    const options = {
        strictBounds: true
    }

    const restrictions = {
        country: "sg"
    }

    const onLoad = useCallback((searchResults) => {
        searchResultRef.current = searchResults;
    },[])

    const onPlaceChanged = useCallback(() => {
        const places = searchResultRef.current.getPlace();
        if (places.geometry) {
            mapRef.current.setZoom(13);
            mapRef.current.panTo(places.geometry.location);
        }
    },[])

    const onUnmount = useCallback(() => {
        searchResultRef.current = "";
    }, []);
    return (
        <>
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            onUnmount={onUnmount}
            options={options}
            restrictions={restrictions}
        >
            <input
                placeholder="Search"
                className={mapStyle.searchbar}
            />
        </Autocomplete>
    </>
    )
}