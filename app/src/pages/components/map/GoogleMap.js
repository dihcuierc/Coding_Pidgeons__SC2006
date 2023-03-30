import mapStyle from "../../../assets/css/Map.module.css"
import {useCallback, useMemo, useRef} from "react";

import {
    GoogleMap,
    useLoadScript,
} from "@react-google-maps/api";
import Searchbar from "./Searchbox/Searchbox";

const libraries = ["places", "routes"];

function Map(props) {
    const mapRef = useRef(GoogleMap);
    const {isLoaded}  = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY,
        libraries
    });
    const defaultProps = useMemo(() => ({
        center: {
            lat: 1.3521,
            lng: 103.8198
        },
        zoom: 10,
        options: {
            disableDefaultUI: true,
            clickableIcons: false,
            zoomControl: true,
        }
    }),[]);
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    if (!isLoaded)
        return <div>Loading...</div>
    return (
            <GoogleMap
                zoom={defaultProps.zoom}
                center={defaultProps.center}
                options={defaultProps.options}
                onLoad={onLoad}
                id="map"
                mapContainerClassName={mapStyle.display}
            >
                <Searchbar mapRef={mapRef}/>
                {props.children}
            </GoogleMap>
    )
}

export {Map};