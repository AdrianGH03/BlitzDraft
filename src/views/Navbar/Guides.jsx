//Hooks
import { useState, useEffect } from 'react';
import { useYoutubeVideos } from '../../hooks/useYoutubeVideos';

//NPM/React
import { CustomSkeleton } from '../../components/CustomSkeleton';

//assets
import tn1 from '../../assets/guidesImages/tn1.jpg';
import tn2 from '../../assets/guidesImages/tn2.jpg';
import tn3 from '../../assets/guidesImages/tn3.jpg';
import tn4 from '../../assets/guidesImages/tn4.jpg';
import tn5 from '../../assets/guidesImages/tn5.jpg';
import tn6 from '../../assets/guidesImages/tn6.jpg';
import tn7 from '../../assets/guidesImages/tn7.jpg';
import tn8 from '../../assets/guidesImages/tn8.jpg';
import tn9 from '../../assets/guidesImages/tn9.jpg';

const thumbnails = [tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9];

export const Guides = () => {

  const [youtubeVideos, setYoutubeVideos] = useYoutubeVideos();
  

  return (
    <article className='guides-container fade-in-fwd'>
        <h1 className='fade-in-fwd'>GUIDES</h1>
        <div className="guides-wrapper fade-in-fwd">
        {thumbnails.map((video, index) => {
            
            return (
                <section key={index} className='fade-in-fwd'>
                    
                  <div className="image-container" onClick={() => window.open(youtubeVideos[index].LinkTo, "_blank")}>
                    <img src={thumbnails[index]} width="500" 
                      alt={youtubeVideos[index].TITLE}
                    />
                  </div>
                    
                    
                </section>
            )
        })}
        </div>
    </article>
  )
}