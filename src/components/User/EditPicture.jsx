// Hooks
import { useState, useEffect, useContext } from 'react';

//Contexts
import { AuthContext } from '../../contexts/AuthContext.jsx';

//NPM/REACT

import PropTypes from 'prop-types';

export const EditPicture = ({ setProfileImage }) => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [picturesPerPage, setPicturesPerPage] = useState(9);
  const [disableSave, setDisableSave] = useState(false);

  const { isAuthenticated, fetchWithToken, success, setSuccess, error, setError } = useContext(AuthContext);
  

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
              
              setSuccess('Profile picture updated successfully. Refreshing...');
              setProfileImage(`${import.meta.env.VITE_APP_GET_PICTURES}/${selectedPicture}`);
              setDisableSave(true);
              setTimeout(() => {
                setSuccess('');
                window.location.reload();
                setDisableSave(false);
              }, 1500);
  
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
    <div className="peditprof-container fade-in-fwd">
        <ul>
            {currentPictures.map((picture, index) => (
                <li key={index} className="peditprof-image">
                    <img src={`${import.meta.env.VITE_APP_GET_PICTURES}/${picture}`} alt={`Profile Picture ${index + 1}`}
                    className="" crossOrigin={"anonymous"}
                    onClick={() => setSelectedPicture(picture)}
                    style={selectedPicture === picture ? {border: '3.5px solid #e63b3b'} : {border: '3.5px solid white'}}
                    />
                </li>
            ))}
        </ul>
        <div className="peditprof-pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            <button onClick={saveProfilePicture} disabled={!selectedPicture || disableSave}>Save</button>
            <p>{
                currentPage === totalPages ? `${indexOfFirstPicture + 1} - ${pictures.length} of ${pictures.length}` : `${indexOfFirstPicture + 1} - ${indexOfLastPicture} of ${pictures.length}`
                }</p>

            <p className='peditprof-msg'>
                {success && success}
                {error && error}
            </p>
        </div>
    </div>
  )
}

EditPicture.propTypes = {
  setProfileImage: PropTypes.func,
}
