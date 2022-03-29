import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, {Popup, ScaleControl, Source, Layer, GeolocateControl, NavigationControl, FullscreenControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
        {showPopup && (
          <Popup longitude={42.7} latitude={42.30}
            anchor="bottom"
            onClose={() => setShowPopup(false)}>
            <p className='text-lg text-orange-500'>You are here</p> 
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
