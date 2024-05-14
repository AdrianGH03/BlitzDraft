
import  { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { TeamImages } from '../../components/Layout/TeamImages';
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTournaments } from '../../hooks/useTournaments';
import { usePatches } from '../../hooks/usePatches';


export function Stats() {
  const { fetchWithToken } = useContext(AuthContext);
  const [table, setTable] = useState([]);
  const [champs, setChamps] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');
  const { tournaments } = useTournaments();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [champImagesLoaded, setChampImagesLoaded] = useState(false);

  const [selectedTournament, setSelectedTournament] = useState({ name: '2024 Mid-Season Invitational', patchesPlayed: '14.1-14.2' });
  const [selectedPatch, setSelectedPatch] = useState('');
  const [selectedSide, setSelectedSide] = useState('');

  //14.1-14.24
  const patches = usePatches();


  const correctNames = {
    "Wukong": "MonkeyKing",
    "Miss Fortune": "MissFortune",
    "ChoGath": "Cho'Gath",
    "TahmKench": "Tahm Kench",
    "RekSai": "RekSai",
    "Vel'Koz": "Velkoz",
    "Master Yi": "MasterYi",
    "Twisted Fate": "TwistedFate",
    "Dr. Mundo": "DrMundo",
    "Jarvan IV": "JarvanIV",
    "Kha'Zix": "Khazix",
    "LeBlanc": "Leblanc",
    "Lee Sin": "LeeSin",
    "Belveth": "Belveth",
    "Xin Zhao": "XinZhao",
    "Aurelion Sol": "AurelionSol",
    "Renata Glasc": "Renata",
    "Tahm Kench": "TahmKench",
    "Kai'Sa": "Kaisa",
    "K'Sante": "KSante",
    "Rek'Sai": "RekSai",
    "Bel'Veth": "Belveth",
    "Kog'Maw": "KogMaw",
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
        } else if (error.response.status == 400){
          setError('No games found for selected parameters.');
        } else {
          setError('An error occurred. Please try again later.');
          console.error(error);
        }
        setTable([]);
      });
  }, []);
  
  useEffect(() => {
    handleChangeTable(selectedTournament)
  }, [champs]);
 
  function handleChangeTable(tournament, patch, side) {
    setError('')
    if (tournament || patch) {
      const requestBody = {};
      if (tournament) {
        requestBody.tournament = tournament.name;
      }
      if (patch) {
        requestBody.patch = patch;
      }
      if(side){
        requestBody.side = side;
      }
      
      fetchWithToken.post(`http://localhost:3000/stats/cpicksbans`, requestBody)
         .then(response => {
           const jsonData = {};
           Object.entries(response.data).forEach(([championName, championData]) => {
             let correctedChampionName = correctNames[championName] || championName;
             let champImage;
             for (let role in champs) {
               if (champs[role][correctedChampionName]) {
                 champImage = champs[role][correctedChampionName];
                 break;
               }
             }
             const data = {
               Champion: correctedChampionName,
               Picks: championData.picks,
               Bans: championData.bans,
               Presence: championData.presence,
               Wins: championData.wins,
               Losses: championData.losses,
               Winrate: championData.winrate,
               Image: champImage,
             }
             
             if (Object.values(data).some(value => value !== null && value !== undefined && value !== '')) {
               jsonData[data.Champion] = data;
             }
           });
           setTable(jsonData);
         })
         .catch(error => {
           if(error.response && error.response.status == 429){
             setError('Too many requests. Please try again later.');
           } else if (error.response.status == 400){
            setError('No games found for selected parameters.');
           } else {
             setError('An error occurred. Please try again later.');
             console.error(error);
           }
         });
      }
  }

  const columns = useMemo(() => {
    let cols = [
      {
        Header: 'Champion',
        accessor: 'Champion',
        Cell: ({ row }) => (
          <div className='stat-champ-container'>
            <img src={row.original.Image} alt="Champion" />
            {row.original.Champion}
          </div>
        )
      },
      {
        Header: 'Picks',
        accessor: 'Picks',
      },
      {
        Header: 'Bans',
        accessor: 'Bans',
      },
      {
        Header: 'Presence',
        accessor: 'Presence',
        Cell: ({ value }) => `${value != null ? value : '0'}%`,
      },
      {
        Header: 'Winrate',
        accessor: 'Winrate',
        Cell: ({ value }) => `${value != null ? value : '0'}%`,
      },
      {
        Header: 'Losses',
        accessor: 'Losses',
      },
      {
        Header: 'Wins',
        accessor: 'Wins',
      }
    ];
  
   
  
    return cols;
  }, []);
  
  const data = useMemo(() => Object.values(table), [table]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);
  
  
  
  return (
    <>
    
        { champImagesLoaded && (
          champs && (
          <main className="stat-container fade-in-fwd">
            <h1 className="stat-header">
                CHAMPION STATS
            </h1>
            <div className="stat-content">

            <div className="stat-filters">
              <div className="stat-filter">
                <label htmlFor="tournament">Tournament</label>
                <select id="tournament" onChange={e => {
                  const tournamentName = e.target.value;
                  const tournament = tournaments[tournamentName][0];
                  setSelectedTournament(tournament);
                  handleChangeTable(tournament, selectedPatch, selectedSide);
                }}>
                  {Object.keys(tournaments).map((tournamentName, index) => (
                    <optgroup key={index} label={tournamentName}>
                      {tournaments[tournamentName].map((tournament, i) => (
                        <option key={i} value={tournamentName}>{tournament.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="stat-filter">
                <label htmlFor="patch">Patch</label>
                <select id="patch" onChange={e => {
                  setSelectedPatch(e.target.value);
                  handleChangeTable(selectedTournament, e.target.value, selectedSide);
                }}>
                  <option value="">All</option>
                  {patches.map((patch, index) => (
                    <option key={index} value={patch}>{patch}</option>
                  ))}
                </select>
              </div>

              <div className="stat-filter">
                <label htmlFor="side">Side</label>
                <select id="side" onChange={e => {
                  setSelectedSide(e.target.value);
                  handleChangeTable(selectedTournament, selectedPatch, e.target.value);
                }}>
                  <option value="">All</option>
                  <option value="Team1">Blue</option>
                  <option value="Team2">Red</option>
                </select>
              </div>
            </div>

            


            { error && <div className='stat-error'>{error}</div> }
              { table && !error && Object.keys(table).length > 0 && (
                <div className="stat-table-wrapper">
                <div className="stat-table">
                  <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                          {headerGroup.headers.map((column, j) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                              <div className='stat-table-header'>
                                {column.render('Header')}
                                <span className='testt'>
                                  {column.isSorted
                                    ? column.isSortedDesc
                                      ? <FontAwesomeIcon icon={faSortDown} style={{width: '20px'}}/>
                                      : <FontAwesomeIcon icon={faSortUp} style={{width: '20px'}}/>
                                    : <FontAwesomeIcon icon={faPlus} style={{width: '20px'}}/>}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={i}>
                            {row.cells.map((cell, j) => (
                              <td {...cell.getCellProps()} key={j}>{cell.render('Cell')}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                    </table>
                </div>
                </div>
              )}
            
            <div className="stat-team-logos">
              <TeamImages
                containerClass="stat-teams-regions-container"
                itemClass="stat-teams-region"
                showName={false}
              />
            </div>
            </div>
          </main>
        
         )
     )} 

      
    </>
  )
}
