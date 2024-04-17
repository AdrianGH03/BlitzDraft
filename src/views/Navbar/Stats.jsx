
import React, { useEffect, useState, useContext } from 'react';
import readXlsxFile from 'read-excel-file';
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

  const correctNames = {
    "Wukong": "MonkeyKing",
    "Miss Fortune": "MissFortune",
    "Chogath": "Cho'Gath",
    "TahmKench": "Tahm Kench",
    "RekSai": "RekSai",
    "Velkoz": "Velkoz",
    "KogMaw": "KogMaw",
    "MasterYi": "MasterYi",
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
        fetch('/AllRegions.xlsx')
          .then(response => response.blob())
          .then(blob => {
            readXlsxFile(blob).then((rows) => {
              const jsonData = {};
              rows.slice(1, 135).forEach((row) => {
                let correctedChampionName = correctNames[row[0]] || row[0];
                let champImage;
                for (let role in response.data) {
                  if (response.data[role][correctedChampionName]) {
                    champImage = response.data[role][correctedChampionName];
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
            });
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);
  
  console.log(table)
  return (
    <>
        { table ? (
          Object.keys(table).length > 50 && champs && (
          <section className="stats-container fade-in-fwd">
            <h1>STATS</h1>
            <div className="stats-region-images fade-in-fwd">
                <img src={lplLogo} alt="LPL" />
                <img src={lecLogo} alt="LEC" />
                <img src={lckLogo} alt="LCK" />
                <img src={lcsLogo} alt="LCS" />
            </div>

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
                            <h3>{(table[champion].Presence * 100).toFixed(0)}%</h3>
                        </td>
                        <td className="stats-win">
                            <h3>{table[champion].Wins}</h3>
                        </td>
                        <td className="stats-loss">
                            <h3>{table[champion].Losses}</h3>
                        </td>
                        <td className="stats-winrate">
                            <h3>{(table[champion].Winrate * 100).toFixed(0)}%</h3>
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
                  <span>Last updated April 16th, 2024</span>
                </div>
            </div>


        </section>
        )
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
    </>
  )
}
