import GoogleMap from "../components/map/GoogleMap";

import parkData from "../../data/park-facilities-geojson.json"
import Marker from "../components/map/Marker";

export default function Facilities() {
    const defaultProps = {
        center: {
            lat: 1.44883613021403,
            lng: 103.771463555332005
        },
        zoom: 10
    };
    const places = parkData.features;
    console.log(places)
    return (
        <>
            <GoogleMap
                bootstrapURLKeys={{
                    key: "",
            }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {places.map((place) => (
                    <Marker
                        key={place.properties.Name}
                        lng={place.geometry.coordinates[0]}
                        lat={place.geometry.coordinates[1]}
                        place={place}/>
                ))}
            </GoogleMap>
        </>
    )
}