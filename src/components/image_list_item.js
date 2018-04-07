import React from 'react';

const ImageListItem = ({image, time}) => {
   const description = image.getElementsByTagName('description')[0].textContent;
   const src = `${image.getElementsByTagName('url')[0].textContent}?${time}`;

   return (
      <li className="list-inline-item">
         <figure className="figure">
               <img className="figure-img img-fluid rounded" src={src} alt={description} />
               <figcaption className="figure-caption">{description}</figcaption>
         </figure>
      </li>
   );
};

export default ImageListItem;
