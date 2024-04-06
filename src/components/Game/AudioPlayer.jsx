// AudioPlayer.jsx
import { useEffect, useState, useRef } from 'react';

// Audio files
import track1 from '../../assets/audio/playlistSong1.ogg'; // Current summoners rift pick song
import track2 from '../../assets/audio/playlistSong2.wav'; //Classic summoners rift blind pick
import track3 from '../../assets/audio/playlistSong3.wav'; //Classic summoners rift draft pick
import track4 from '../../assets/audio/playlistSong4.wav'; //Dominion blind pick
import track5 from '../../assets/audio/playlistSong5.wav'; //Dominion draft pick
import track6 from '../../assets/audio/playlistSong6.wav'; //Ksante theme
import track7 from '../../assets/audio/playlistSong7.wav'; //Worlds 2022 theme orchestral
import track8 from '../../assets/audio/playlistSong8.wav'; //Worlds 2017 theme
import track9 from '../../assets/audio/playlistSong9.wav'; //Worlds 2021 orchestral theme
import track10 from '../../assets/audio/playlistSong10.wav'; //2017 login screen

const tracks = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10];

export function AudioPlayer({ startGame }) {
    const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * tracks.length));
    const audioRef = useRef(null);

    const playAudio = () => {
        if (audioRef.current.paused) {
            audioRef.current.src = tracks[currentTrack];
            audioRef.current.volume = 0.01;
            audioRef.current.play();
        }
    }

    useEffect(() => {
        if (startGame) {
            window.addEventListener('mousemove', playAudio);
            return () => {
                window.removeEventListener('mousemove', playAudio);
            }
        } else {
            audioRef.current.pause();
        }
    }, [startGame, currentTrack]);

    useEffect(() => {
        if (audioRef.current.ended) {
            setCurrentTrack(Math.floor(Math.random() * tracks.length));
        }
    }, [currentTrack]);

    return (
        <audio 
        ref={audioRef} 
        onEnded={() => setCurrentTrack(Math.floor(Math.random() * tracks.length))} 
        />
    );
}