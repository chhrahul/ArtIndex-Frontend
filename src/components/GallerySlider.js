import React, { useEffect } from 'react'
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';


export default function GallerySlider(props) {
    const { image } = props
    const [imageData, setimageData] = React.useState([]);
    const ImageArray = []
    React.useEffect(() => {
        image.map((data, index) =>  
            // setimageData (data[0])
            ImageArray.push({'original':data[0],'thumbnail':data[0]})
        ); 
    }, [image]);
     
  
    console.log('ImageArray',ImageArray)
    const images = [
        {
            original: '/rose.jpg',
            thumbnail: '/rose.jpg',
        },
        {
            original: '/rose.jpg',
            thumbnail: '/rose.jpg',
        },
        {
            original: '/rose.jpg',
            thumbnail: '/rose.jpg',
        }
    ];
    console.log('image',image);
    console.log('images',images);
    return (
        <div className="wrapper">
            <ImageGallery showPlayButton={false}  items={ImageArray} />
        </div>
    )
}
