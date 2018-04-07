import React from 'react';
import ImageListItem from './image_list_item';

const ImageList = (props) => {
   const imageItems = props.images.map((image) => {
      return (
         <ImageListItem
            key={image.getElementsByTagName('key')[0].textContent}
            image={image}
            time={props.time}/>
      );
   });

   return (
      <ul className="list-inline">
         {imageItems}
      </ul>
   );
}

export default ImageList;
