import React, { Component } from 'react';

export default class ImageListItem extends Component {
   render() {
      const { image, time, distanceLabel, onActivate, isActive, liRef } = this.props;
      const description = image.getElementsByTagName('description')[0].textContent;
      const src = `${image.getElementsByTagName('url')[0].textContent}?${time}`;
      const key = image.getElementsByTagName('key')[0].textContent;

      return (
         <li className="list-group-item" ref={liRef}>
            <figure
               className={'figure' + (isActive ? ' active' : '')}
               // onMouseOver={event => onActivate()}
               // onMouseOut={event => onDeactivate()}
               onClick={event => onActivate()}
               >
                  <img className="figure-img img-fluid rounded" src={src} alt={`${description}${distanceLabel}`} height="240" width="320" />
                  <figcaption className="figure-caption">{description}</figcaption>
            </figure>
         </li>
      );
   }
}
