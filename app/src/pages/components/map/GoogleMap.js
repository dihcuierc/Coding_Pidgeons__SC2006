import mapStyle from "../../../assets/css/Map.module.css"
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const GoogleMap = ({ children, ...props }) => (
    <div className={mapStyle.display}>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "",
            }}
            {...props}
        >
            {children}
        </GoogleMapReact>
    </div>
);

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;