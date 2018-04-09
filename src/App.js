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
         navigator.geolocation.getCurrentPosition(position => {
            this.setState({ position });
            navigator.geolocation.watchPosition(position =>
               this.setState({ position }));
         });
      }

      this.imageSearch({ term: '', language: 'En' });
      setInterval(() => {
         this.setState({ time: new Date().getTime() })
      }, 10000);
   }

   imageSearch({ term, language }) {
      console.log(language);
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
      const { position } = this.state;

      return (
         <div>
            <SearchBar onSearchTermChange={imageSearch} />
            {position && <div>Latitude: {position.coords.latitude}, Longitude: {position.coords.longitude}</div>}
            <ImageList images={this.state.images} time={this.state.time} />
            <footer className="footer">Created by <a href="https://twitter.com/robertlowe">@robertlowe</a></footer>
         </div>
      );
   }
}

export default App;
