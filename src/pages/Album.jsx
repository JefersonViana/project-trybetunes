import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
      array: [],
      prevArray: [],
      validation: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  handleChecked = async ({ target }, music) => {
    const response = await addSong(music);
    console.log(response);
    this.setState({
      validation: target.checked,
    });
  };

  fetchMusic = async () => {
    const getStorage = await getFavoriteSongs();
    const fix = 0;
    const { match } = this.props;
    const { params } = match;
    const response = await getMusics(params.id);
    if (getStorage.length === fix) {
      const newArray = response.filter((_element, index) => index >= 1);
      this.setState({
        array: newArray,
        isTrue: false,
        prevArray: response,
      });
    } else {
      getStorage.forEach((object) => {
        object.isTrue = true;
      });
      const newArray1 = response.filter((music) => !getStorage
        .some((obj) => obj.trackId === music.trackId));
      const newArray2 = newArray1.filter((_element, index) => index >= 1);
      this.setState({
        array: [...getStorage, ...newArray2],
        isTrue: false,
        prevArray: response,
      });
    }
  };

  render() {
    const { isTrue, array, prevArray, validation } = this.state;
    console.log(array);
    return (
      <div data-testid="page-album">
        <Header />
        { isTrue && <Carregando /> }
        { !isTrue && (
          <div>
            <h3 data-testid="album-name">{ prevArray[0].collectionName }</h3>
            <p data-testid="artist-name">{ prevArray[0].artistName }</p>
            <ul>
              {array.map((object, index) => (
                <div key={ index }>
                  <p>{ object.trackName }</p>
                  <MusicCard
                    music={ object }
                    callback={ this.handleChecked }
                    isChecked={ validation }
                  />
                </div>
              ))}
            </ul>
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
