import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import SearchBar from './components/search_bar';
import ImageList from './components/image_list';

const MyMapComponent = withScriptjs(withGoogleMap(({ images, active }) => {
   const markers = images.map(image => {
      const key = image.getElementsByTagName('key')[0].textContent;

      // Markers: see https://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/18623391#18623391
      const icon = key === active
         ? 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
         : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

      return (
         <Marker
            key={key}
            position={{
               lat: Number(image.getElementsByTagName('latitude')[0].textContent),
               lng: Number(image.getElementsByTagName('longitude')[0].textContent)
            }}
            onClick={() => console.log('Marker clicked: ' + key)}
            icon={icon}
         />
      );
   });

   return (
      <GoogleMap defaultZoom={11} defaultCenter={{ lat: 22.3964, lng: 114.1095 }}>
         {markers}
      </GoogleMap>
   );
}));

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         images: [],
         time: 0,
         position: null
      };

      if (navigator.geolocation) {
         navigator.geolocation.watchPosition(position => {
            this.setState({ position });
            console.log('New position: ', position);
         });
      }

      this.imageSearch({ term: '', language: 'En' });
      const theObj = this;
      (function loop() {
         setTimeout(() => {
            theObj.setState({ time: new Date().getTime() });
            loop();
         }, 10000);
      })();
   }

   imageSearch({ term, language }) {
      axios.get(`Traffic_Camera_Locations_${language}.xml`)
         .then(response => {
            const images = Array.from(new DOMParser().parseFromString(response.data, 'application/xml').getElementsByTagName('image'));
            const results = images.filter(image => image.getElementsByTagName('description')[0].textContent.toLowerCase().includes(term.toLowerCase()));
            this.setState({
               images: results
            });
         })
   }

   render() {
      const imageSearch = _.debounce((term) => { this.imageSearch(term) }, 300);

      return (
         <div style={{ height: `100%` }}>
            <SearchBar onSearchTermChange={imageSearch} />
            <div className="container-fluid" style={{ height: `94%` }}>
               <div className="row no-gutters" style={{ height: `100%` }}>
                  <div className="col-md order-md-last" style={{ height: `100%` }}>
                     <MyMapComponent
                        images={this.state.images}
                        active={this.state.active}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGr35_Kh7izigi3n4tjw0WwH6IilLaNIw&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        //containerElement={<div style={{ height: `400px` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                     />
                  </div>
                  <div className="col-md-auto scrollable" style={{ height: `100%`, overflow: 'scroll' }}>
                     <ImageList
                        images={this.state.images}
                        time={this.state.time}
                        position={this.state.position}
                        setActive={key => this.setState({ active: key })}
                        active={this.state.active}
                     />
                     <footer className="footer">Created by <a href="https://twitter.com/robertlowe">@robertlowe</a></footer>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;
