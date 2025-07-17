import React, { useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { PropagateLoader } from 'react-spinners';

library.add(faHeart);

const ImageLoading = (props) => {
    const [imageLoading ,setImageLoading]=useState(true)

    const handleImageLoad = () => {
        setImageLoading(false);
      };


  return (
   <>

            {imageLoading && (
                <div  className=" d-flex align-items-center justify-content-center ">
                <div  className=" d-flex align-items-center justify-content-center "style={{width:props.w ,height:props.h ,background:"rgba(172, 173, 173, 0.8)"}}>
                <PropagateLoader color="white" loading={true} size={5} />
                </div>
                
                </div>
            )}
            <div className=" d-flex align-items-center justify-content-center ">
             <img src={props.path} 
             width={props.w}
             height={props.h}
             alt={props.alt?props.alt:"image"}
              style={{ display: imageLoading ? 'none' : 'block' }}
              onLoad={handleImageLoad}
              />
            </div>

   </>
  )
}

export default ImageLoading
