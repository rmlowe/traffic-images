import React, { Component } from 'react';

class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = { term: '', language: 'En' };
   }

   onLanguageChanged(language) {
      this.setState({ language });
      this.props.onSearchTermChange({ term: this.state.term, language });
   }

   render() {
      const langs = [
         { code: 'En', label: 'ENG', placeholder: 'Type a location' },
         { code: 'Tc', label: '繁', placeholder: '鍵入位置' },
         { code: 'Sc', label: '簡', placeholder: '键入位置' }
      ];
      const radioButtons = langs.map(lang => {
         return (
            <div className="form-check form-check-inline" key={lang.code}>
               <input className="form-check-input" type="radio" name="language" id={lang.code} value={lang.code} checked={this.state.language === lang.code} onChange={event => this.onLanguageChanged(event.currentTarget.value)} />
               <label className="form-check-label" htmlFor="language-En">{lang.label}</label>
            </div>
         );
      });
      const placeholder = langs.filter(lang => lang.code === this.state.language)[0].placeholder;

      return (
         <div className="form-row m-1">
            <div className="col">
               <input
                  className="form-control"
                  value={this.state.term}
                  onChange={event => this.onInputChange(event.target.value)}
                  placeholder={placeholder}
                  autoFocus
               />
            </div>
            <div className="col-auto mt-1">
               {radioButtons}
            </div>
         </div>
      );
   }

   onInputChange(term) {
      this.setState({term});
      this.props.onSearchTermChange({ term, language: this.state.language });
   }
}

export default SearchBar;
