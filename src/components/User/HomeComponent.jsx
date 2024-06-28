
import PropTypes from 'prop-types';


export const HomeComponent = ({ userInfo, profileImage, lolplaceholder }) => {

  return (
    <div className="phome-component-container fade-in-fwd">
        <div className="phome-component-top">
            <h1>{userInfo.username && Array.from(userInfo.username).length > 13
                    ? `${userInfo.username.substring(0, 13)}...`
                    : userInfo.username}
            </h1>
            <img src={profileImage ? profileImage : lolplaceholder} alt="profile" />
        </div>
        <ul className="phome-component-bot">
            <li>
                <h5>Username</h5>
                <p>{userInfo.username && userInfo.username}</p>
            </li>
            <li>
                <h5>Email</h5>
                <p>{userInfo.email && Array.from(userInfo.email).length > 17
                    ? `${userInfo.email.substring(0, 17)}...`
                    : userInfo.email}
                </p>
            </li>
            <li>
                <h5>Points</h5>
                <p>{userInfo.points && userInfo.points}</p>
            </li>
            <li>
                <h5>Rank</h5>
                <p>N/A</p>
            </li>
        </ul>
    </div>
  )
}

HomeComponent.propTypes = {
  userInfo: PropTypes.object,
  profileImage: PropTypes.string,
  lolplaceholder: PropTypes.string,
}
