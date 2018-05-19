import React from 'react';

const ImageListItem = ({image, time, distanceLabel, onActivate, onDeactivate, isActive}) => {
   const description = image.getElementsByTagName('description')[0].textContent;
   const src = `${image.getElementsByTagName('url')[0].textContent}?${time}`;
   const key = image.getElementsByTagName('key')[0].textContent;

   return (
      <li className="list-inline-item">
         <figure
            className={'figure' + (isActive ? ' active' : '')}
            onMouseOver={event => onActivate()}
            onMouseOut={event => onDeactivate()}
            onClick={event => console.log('Click: ' + key)}
            >
               <img className="figure-img img-fluid rounded" src={src} alt={`${description}${distanceLabel}`} height="240" width="320" />
               <figcaption className="figure-caption">{description}</figcaption>
         </figure>
      </li>
   );
};

export default ImageListItem;
