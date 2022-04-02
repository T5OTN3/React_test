import { useEffect, useState, useRef, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, {Popup, ScaleControl, Marker, Source, Layer, GeolocateControl, NavigationControl, FullscreenControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './components/map/pin';
import CITIES from './components/map/data.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiY290bmUxOTg5IiwiYSI6ImNqcmcxZWxnNDFqdzU0YW1seW43ZDZ1NjgifQ.zX_zd9Fx1zxv0Yo4gBCu_Q';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [42.7, 42.2]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={Number(city.lng)}
          latitude={Number(city.lat)}
          anchor="bottom"
        >
          <Pin onClick={() => setPopupInfo(city)} />
        </Marker>
      )),
    []
  );

  return (
    <Map
        initialViewState={{
          longitude: 42.7,
          latitude: 42.2,
          zoom: 8
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins}
        {popupInfo && (
          <Popup 
            longitude={Number(popupInfo.lng)} 
            latitude={Number(popupInfo.lat)}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}>
            <p className='text-lg text-orange-500'>{popupInfo.name}</p> 
          </Popup>)}
          <ScaleControl />
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
      </Map>
  );
}

export default App;
