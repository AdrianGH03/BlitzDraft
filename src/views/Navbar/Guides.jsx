//Hooks
import { useState, useEffect } from 'react';
import { useYoutubeVideos } from '../../hooks/useYoutubeVideos';

//NPM/React
import { CustomSkeleton } from '../../components/CustomSkeleton';

export const Guides = () => {

  const [youtubeVideos, setYoutubeVideos] = useYoutubeVideos();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(new Array(youtubeVideos.length).fill(false));
  }, [youtubeVideos]);

  return (
    <article className='guides-container fade-in-fwd'>
        <h1 className='fade-in-fwd'>GUIDES</h1>
        <div className="guides-wrapper">
        {youtubeVideos.map((video, index) => {
            const title = video.TITLE.length > 35 ? video.TITLE.substring(0, 35) + '...' : video.TITLE;
            return (
                <section key={index} className='fade-in-fwd'>
                    {!videoLoaded ? <CustomSkeleton count={5} /> : 
                        <iframe src={video.Link} width="500" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onLoad={() => setVideoLoaded(true)}></iframe>
                    }
                    
                </section>
            )
        })}
        </div>
    </article>
  )
}