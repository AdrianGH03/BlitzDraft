// Hooks
import { useState, useEffect, useContext } from 'react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext';

//NPM/REACT
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';



export const ChangePFP = ({ setProfileImage, setChangePFP }) => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [picturesPerPage, setPicturesPerPage] = useState(window.innerWidth < 820 ? 12 : 18);
  const [disableSave, setDisableSave] = useState(false);

  const { isAuthenticated, fetchWithToken, success, setSuccess, error, setError } = useContext(AuthContext);
  
  

  
  useEffect(() => {
    const handleResize = () => {
      setPicturesPerPage(window.innerWidth < 820 ? 12 : 18);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
      if(!isAuthenticated) return;
      fetchWithToken.get(import.meta.env.VITE_APP_ALL_PICTURES, { withCredentials: true })
          .then(response => {
              setPictures(response.data);
          })
          .catch(error => {
                console.error('Error fetching profile pictures', error);
          });
  }, [isAuthenticated]);


  const saveProfilePicture = async () => {
    setSuccess('');
    if (isAuthenticated && selectedPicture) {
        try {
            const response = await fetchWithToken.put(import.meta.env.VITE_APP_UPDATE_USER_PFP, { image: selectedPicture }, { withCredentials: true });
            if (response.status === 200) {
              
              setSuccess('Profile picture updated successfully. Please wait...');
              setProfileImage(`${import.meta.env.VITE_APP_GET_PICTURES}/${selectedPicture}`);
              setDisableSave(true);
              setTimeout(() => {
                setSuccess('');
                window.location.reload();
                setDisableSave(false);
              }, 3000);
  
            }
        } catch (error) {
            console.error('Error saving profile picture', error);
            if (error.response.status === 429) {
              setError('Too many requests, please try again later');
            } else {
                setError('Error saving profile picture');
            }
        }
    } else {
        console.error('User is not logged in or no picture selected');
    }
  };

  const indexOfLastPicture = currentPage * picturesPerPage;
  const indexOfFirstPicture = indexOfLastPicture - picturesPerPage;
  const currentPictures = pictures.slice(indexOfFirstPicture, indexOfLastPicture);
  const totalPages = Math.ceil(pictures.length / picturesPerPage);

  const nextPage = () => {
      setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };

  return (
    <>
        <div className="profile-images-grid">
            {currentPictures && currentPictures.map((picture, index) => (
                <div key={index} className="profile-image-grid-container">
                    <img src={`${import.meta.env.VITE_APP_GET_PICTURES}/${picture}`} alt={`Profile Picture ${index + 1}`}
                    className="profile-grid-image" crossOrigin={"anonymous"}
                    onClick={() => setSelectedPicture(picture)}
                    style={selectedPicture === picture ? {border: '3.5px solid cyan'} : {border: '3.5px solid white'}}
                    />
                </div>
            ))}
        </div>
        
        <div className="profile-pagination ." >
            <Tippy content={'Previous'} className="tippy-tooltip" animation={'shift-away-subtle'} roundArrow={true} >
                <button onClick={prevPage} disabled={currentPage === 1}><i className="bi bi-arrow-left-circle-fill"></i></button>
            </Tippy>
            <Tippy content={'Next'} className="tippy-tooltip" animation={'shift-away-subtle'} roundArrow={true} >
                <button onClick={nextPage} disabled={currentPage === totalPages}><i className="bi bi-arrow-right-circle-fill"></i></button>
            </Tippy>
            <Tippy content={'Save'} className="tippy-tooltip" animation={'shift-away-subtle'} roundArrow={true} >
                <button onClick={saveProfilePicture} disabled={disableSave} className="profile-save-button"><i className="bi bi-cloud-download"></i></button>
            </Tippy>
            <Tippy content={'Go Back'} className="tippy-tooltip" animation={'shift-away-subtle'} roundArrow={true} >
                <button onClick={() => setChangePFP(false)} className="profile-save-button"><i className="bi bi-arrow-90deg-left"></i></button>
            </Tippy>
        </div>

        <div className="profile-status">
            {error != '' && <p style={{color: 'red'}}>{error}</p>}
            {success != '' && <p style={{color: '#5be0e5ff'}}>{success}</p>}
        </div>
    </>
  )
}

ChangePFP.propTypes = {
    profileImage: PropTypes.string,
    setChangePFP: PropTypes.func,
    setProfileImage: PropTypes.func,
};



