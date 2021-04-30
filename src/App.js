import React from 'react';
import Map from './components/GoogleMap/GoogleMap';

import './App.css';

const App = (props) => {
  return (
    <div className="App">
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
export default App;
