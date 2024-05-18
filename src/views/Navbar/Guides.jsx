
import { useYoutubeVideos } from '../../hooks/useYoutubeVideos';




export const Guides = () => {
  const tn1 = '/guidesImages/tn1.jpg'
  const tn2 = '/guidesImages/tn2.jpg'
  const tn3 = '/guidesImages/tn3.jpg'
  const tn4 = '/guidesImages/tn4.jpg'
  const tn5 = '/guidesImages/tn5.jpg'
  const tn6 = '/guidesImages/tn6.jpg'
  const tn7 = '/guidesImages/tn7.jpg'
  const tn8 = '/guidesImages/tn8.jpg'
  const tn9 = '/guidesImages/tn9.jpg'
  const thumbnails = [tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9];

  const [youtubeVideos, setYoutubeVideos] = useYoutubeVideos();
  

  return (
    <article className='guides-container fade-in-fwd'>
        <h1 className='fade-in-fwd'>Guides</h1>
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