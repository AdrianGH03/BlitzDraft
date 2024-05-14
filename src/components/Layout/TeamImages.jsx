// RegionList.jsx
import React from 'react';
import msiLogo from '../../assets/logoImages/msi.png';
import lecLogo from '../../assets/logoImages/lec.png';
import lckLogo from '../../assets/logoImages/lck.png';
import lcsLogo from '../../assets/logoImages/lcs.png';
import lplLogo from '../../assets/logoImages/lpl.png';
import vcsLogo from '../../assets/logoImages/vcs.png';
import pcsLogo from '../../assets/logoImages/pcs.png';
import cblolLogo from '../../assets/logoImages/cblol.png';
import llaLogo from '../../assets/logoImages/lla.png';

const logos = {
  'MSI 2024': msiLogo,
  'LEC': lecLogo,
  'LCK': lckLogo,
  'LCS': lcsLogo,
  'LPL': lplLogo,
  'VCS': vcsLogo,
  'PCS': pcsLogo,
  'CBLOL': cblolLogo,
  'LLA': llaLogo,
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

