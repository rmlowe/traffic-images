import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/search_bar';
import ImageList from './components/image_list';

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
         <div>
            <SearchBar onSearchTermChange={imageSearch} />
            <ImageList images={this.state.images} time={this.state.time} position={this.state.position} />
            <footer className="footer">Created by <a href="https://twitter.com/robertlowe">@robertlowe</a></footer>
         </div>
      );
   }
}

export default App;
