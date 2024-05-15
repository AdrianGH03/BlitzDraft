// RegionList.jsx


const logos = {
  'MSI 2024': '/logoImages/msi.png',
  'LEC': '/logoImages/lec.png',
  'LCK': '/logoImages/lck.png',
  'LCS': '/logoImages/lcs.png',
  'LPL': '/logoImages/lpl.png',
  'VCS':'/logoImages/vcs.png',
  'PCS': '/logoImages/pcs.png',
  'CBLOL': '/logoImages/cblol.png',
  'LLA': '/logoImages/lla.png',
};

const regions = ['MSI 2024', 'LEC', 'LCK', 'LCS', 'LPL', 'VCS', 'PCS', 'CBLOL', 'LLA'];

export function TeamImages({ containerClass, itemClass, titleClass, showName }){
  return (
    <ul className={containerClass}>
        {regions.map((region, index) => (
        <li key={index} className={itemClass}>
            {showName && <span className={titleClass}>{region}</span> }
            <img src={logos[region]} />
        </li>
        ))}
    </ul>
  )
};

