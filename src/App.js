import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/search_bar';
import ImageList from './components/image_list';

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         images: []
      };

      this.imageSearch('');
   }

   imageSearch(term) {
      axios.get('Traffic_Camera_Locations_En.xml')
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
            <ImageList images={this.state.images} />
            <footer class="footer">Created by <a href="https://twitter.com/robertlowe">@robertlowe</a></footer>
         </div>
      );
   }
}

export default App;
