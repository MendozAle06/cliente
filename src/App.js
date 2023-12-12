import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TrackList({ tracks }) {
  return (
    <ol className="list-group">
      {tracks.map((track, index) => (
        <li key={track.name} className="list-group-item">
          <span className="mr-2">{ } . </span>
          {track.name}
        </li>
      ))}
    </ol>
  );
}

function App() {
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState([]);

  const searchTracks = async () => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=bdd0dd11823e545e1ed08886420d4493&format=json`
      );

      const trackList = response.data.toptracks.track;
      setTracks(trackList);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div className="container mt-5 bg-light p-4">
      <h1 className="text-center mb-4"> </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={searchTracks}
            
          >
            car...
          </button>
        </div>
      </div>
      {tracks.length > 0 && <TrackList tracks={tracks} />}
    </div>
  );
}

export default App;
