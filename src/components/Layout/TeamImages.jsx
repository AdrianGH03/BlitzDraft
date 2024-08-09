// RegionList.jsx


const logos = {
  'MSI': '/logoImages/msi.png',
  'LEC': '/logoImages/lec.png',
  'LCK': '/logoImages/lck.png',
  'LCS': '/logoImages/lcs.png',
  'LPL': '/logoImages/lpl.png',
  'VCS': '/logoImages/vcs.png',
  'PCS': '/logoImages/pcs.png',
  'CBLOL': '/logoImages/cblol.png',
  'LLA': '/logoImages/lla.png',
  "PCL": '/logoImages/pcl.png',
  "LJL": '/logoImages/LJL.png',
  "NACL": '/logoImages/nacl.png',
  "LVPSL": '/logoImages/lvpsl.png',
  "LFL": '/logoImages/lfl.png',
  "EMEAM": '/logoImages/emeam.png',
  "LCO": '/logoImages/LCO.png',
  "LCKCL": '/logoImages/lckcl.png',
};

const regions = ['MSI', 'LEC', 'LCK', 'LCS', 'LPL', 'VCS', 'PCS', 'CBLOL', 'LLA', "PCL", "LJL", "NACL", "LVPSL", "LFL", "EMEAM", "LCO", "LCKCL"];

export function TeamImages({ containerClass, itemClass, titleClass, showName, onImageClick }) {
  return (
    <ul className={containerClass}>
      {regions.map((region, index) => (
        <li key={index} className={itemClass} onClick={() => onImageClick(region)}>
          {showName && <span className={titleClass}>{region}</span>}
          <img src={logos[region]} alt={region} />
        </li>
      ))}
    </ul>
  );
}

