import React from 'react';
import ImageListItem from './image_list_item';

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;

   // to km
	return dist * 1.609344;
}

function imageDistance(position, image) {
   if (position) {
      const lat = Number(image.getElementsByTagName('latitude')[0].textContent);
      const lng = Number(image.getElementsByTagName('longitude')[0].textContent);
      return distance(lat, lng, position.coords.latitude, position.coords.longitude);
   } else {
      return null;
   }
}

const ImageList = (props) => {
   const imagesAndDistances = props.images.map(image => ({
      image: image,
      distance: imageDistance(props.position, image)
   }));

   imagesAndDistances.sort((img1, img2) => img1.distance - img2.distance);

   const imageItems = imagesAndDistances.map(({ image, distance }) => {
      return (
         <ImageListItem
            key={image.getElementsByTagName('key')[0].textContent}
            image={image}
            time={props.time}
            distanceLabel={distance ? ` (${precisionRound(distance, 1)} km)` : ''}/>
      );
   });

   return (
      <ul className="list-inline">
         {imageItems}
      </ul>
   );
}

export default ImageList;
