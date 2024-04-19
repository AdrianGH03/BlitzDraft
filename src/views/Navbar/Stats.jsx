
import  { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import lplLogo from '../../assets/logoImages/lpl.png';
import lckLogo from '../../assets/logoImages/lck.png';
import lecLogo from '../../assets/logoImages/lec.png';
import lcsLogo from '../../assets/logoImages/lcs.png';


export const Stats = () => {
    const { fetchWithToken } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [champs, setChamps] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [champImagesLoaded, setChampImagesLoaded] = useState(false);

  useEffect(() => {
    const images = [lplLogo, lckLogo, lecLogo, lcsLogo];
    let imagesToLoad = images.length;

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const correctNames = {
    "Wukong": "MonkeyKing",
    "Miss Fortune": "MissFortune",
    "ChoGath": "Cho'Gath",
    "TahmKench": "Tahm Kench",
    "RekSai": "RekSai",
    "VelKoz": "Velkoz",
    "KogMaw": "KogMaw",
    "Master Yi": "MasterYi",
    "Twisted Fate": "TwistedFate",
    "Dr. Mundo": "DrMundo",
    "Jarvan IV": "JarvanIV",
    "KhaZix": "Khazix",
    "LeBlanc": "Leblanc",
    "Lee Sin": "LeeSin",
    "Belveth": "Belveth",
    "Xin Zhao": "XinZhao",
    "Aurelion Sol": "AurelionSol",
    "Renata Glasc": "Renata",
    "Tahm Kench": "TahmKench",
  };
  
  useEffect(() => {
    fetchWithToken.get(`${import.meta.env.VITE_APP_ALL_CHAMPS}`)
      .then(response => {
        setChamps(response.data);

        let champImagesToLoad = 0;
        for (let role in response.data) {
          champImagesToLoad += Object.keys(response.data[role]).length;
        }

        for (let role in response.data) {
          for (let champ in response.data[role]) {
            const img = new Image();
            img.src = response.data[role][champ];
            img.onload = () => {
              champImagesToLoad--;
              if (champImagesToLoad === 0) {
                setChampImagesLoaded(true);
              }
            };
          }
        }
      })
      .catch(error => {
        if(error.response.status == 429){
          setError('Too many requests. Please try again later.');
        } else {
          setError('An error occurred. Please try again later.');
          console.error(error);
        }

      });
  }, []);
  
  useEffect(() => {
    if (champs && Object.keys(champs).length > 0){
      fetchWithToken.get(`${import.meta.env.VITE_APP_GET_STATS}`)
        .then(response => {
          const jsonData = {};
          response.data.data.forEach((row) => {
            let correctedChampionName = correctNames[row[0]] || row[0];
            let champImage;
            for (let role in champs) {
              if (champs[role][correctedChampionName]) {
                champImage = champs[role][correctedChampionName];
                break;
              }
            }
            const data = {
              Champion: row[0],
              Picks: row[1],
              Bans: row[2],
              Presence: row[3],
              Wins: row[4],
              Losses: row[5],
              Winrate: row[6],
              Image: champImage,
            }
            
            if (Object.values(data).some(value => value !== null && value !== undefined && value !== '')) {
              jsonData[data.Champion] = data;
            }
          });
          setTable(jsonData);
        })
        .catch(error => {
          if(error.response.status == 429){
            setError('Too many requests. Please try again later.');
          } else {
            setError('An error occurred. Please try again later.');
            console.error(error);
          }
        });
    }
  }, [champs]);
    
  

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);
  
  
  return (
    <>
        { table && !error && champImagesLoaded && imagesLoaded ? (
          Object.keys(table).length > 50 && champs && (
          <section className="stats-container fade-in-fwd">
            <h1>STATS</h1>
            <div className="stats-region-images fade-in-fwd">
                <img src={lplLogo} alt="LPL" />
                <img src={lecLogo} alt="LEC" />
                <img src={lckLogo} alt="LCK" />
                <img src={lcsLogo} alt="LCS" />
            </div>

            <p>
              Most picked and banned champions in the current season for all 4 major regions
            </p>

            <table className="stats-table fade-in-fwd">
                <thead>
                <tr>
                    <th>CHAMPIONS</th>
                    <th>PICKS</th>
                    <th>BANS</th>
                    <th>PRESENCE</th>
                    <th className='stats-table-hide'>WINS</th>
                    <th className='stats-table-hide'>LOSSES</th>
                    <th className='stats-table-hide'>WINRATE</th>
                </tr>
                </thead>
                <tbody>
                {table && Object.keys(table).map((champion, index) => {
                    return (
                    <tr key={index}>
                        <td className="stats-champ">
                            <img src={table[champion].Image} alt={champion} />
                            <h3>{champion.length > 5 && windowWidth < 500
                                ? `${champion.slice(0, 5    )}..` 
                                : champion 
                                
                            }</h3>
                        </td>
                        <td className="stats-pick">
                            <h3>{table[champion].Picks}</h3>
                        </td>
                        <td className="stats-ban">
                            <h3>{table[champion].Bans}</h3>
                        </td>
                        <td className="stats-pres">
                            <h3>{table[champion].Presence}{table[champion].Presence ? '%' : ''}</h3>
                        </td>
                        <td className="stats-win">
                            <h3>{table[champion].Wins}</h3>
                        </td>
                        <td className="stats-loss">
                            <h3>{table[champion].Losses}</h3>
                        </td>
                        <td className="stats-winrate">
                            <h3>{table[champion].Winrate}{table[champion].Winrate ? '%' : ''}</h3>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>


            <div className="stats-text">
                
                <div className="stats-extra">
                  <p>
                      Data is brought forth by <a href="https://gol.gg/esports/home/" target='_blank'>Games of Legends.</a>
                  </p>
                  <span>Updated every Sunday 00:00 GMT</span>
                </div>
            </div>


        </section>
        )
        ) : error ? (
          <div className="error-container">
            <h1>{error}</h1>
          </div>
        ) :
        (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
    </>
  )
}
