import React from 'react';

const ImageListItem = ({image}) => {
   const description = image.getElementsByTagName('description')[0].textContent;

   return (
      <li className="list-inline-item">
         <div className="image-list media">
               <img className="media-object" src={image.getElementsByTagName('url')[0].textContent} alt={description} />
               <div className="media-heading">{description}</div>
         </div>
      </li>
   );
};

export default ImageListItem;
