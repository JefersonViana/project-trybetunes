import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      array: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.fetMusic();
  }

  handleChecked = async (_event, music) => {
    this.setState({
      isLoading: true,
    });
    await removeSong(music);
    this.setState({
      isLoading: false,
      array: await getFavoriteSongs(),
    });
  };

  fetMusic = async () => {
    console.log('fetmusic');
    const arrayFavotite = await getFavoriteSongs();
    arrayFavotite.forEach((music) => {
      music.isCheck = true;
    });
    this.setState({
      isLoading: false,
      array: [...arrayFavotite],
    });
  };

  render() {
    const { isLoading, array } = this.state;
    console.log('render', array);
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading && <Carregando /> }
        { !isLoading && (
          <ul>
            {
              array.map((music) => (
                <li key={ music.trackId }>
                  <p>{ music.trackName }</p>
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    <code>audio</code>
                  </audio>
                  <label data-testid={ `checkbox-music-${music.trackId}` }>
                    Favorita
                    <input
                      type="checkbox"
                      checked
                      onChange={ (event) => this.handleChecked(event, music) }
                    />
                  </label>
                </li>
              ))
            }
          </ul>
        )}
      </div>
    );
  }
}

export default Favorites;
