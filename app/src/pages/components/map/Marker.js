import mapStyle from "../../../assets/css/Map.module.css";
import PropTypes from "prop-types";

const Marker = ({show, place}) => (
    <>
        <div className={mapStyle.marker}>
            {show && <InfoWindow place={place}/>}
        </div>
    </>
)

const InfoWindow = (props) => {
    const { place } = props;

    return (
        <div>
            <div>
                {place.name}
            </div>
            <div>
                <span>
                    {place.rating}
                </span>
            </div>
        </div>
    )
}

Marker.defaultProps = {
    onClick: null
};

Marker.propTypes = {
    onClick: PropTypes.func,
};

export default Marker;