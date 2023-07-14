import React from "react";
// import { GoogleMap,useLoadScript,Marker} from 'google-maps-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapApi = () => {
    const containerStyle = {
        width: '100%',
        height: '900px'
    };

    const center = {
        lat: 32.047589,
        lng: 34.752030
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC7cseZhHkpyGD632DzuWW_yw5tu0cKM1Y"
    })
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker position={{
                lat: 32.047589,
                lng: 34.752030
            }} />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MapApi)
