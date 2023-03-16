import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
      array: [],
      prevArray: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const storage = await getFavoriteSongs();
    const fix = 0;
    const { match } = this.props;
    const { params } = match;
    const response = await getMusics(params.id);
    if (storage.length === fix) {
      this.setState({
        isTrue: false,
        array: response.slice(1, response.length),
        prevArray: response,
      });
    } else {
      const slice = response.slice(1, response.length);
      const newArray = slice.filter((obj) => !storage
        .some((element) => obj.trackName === element.trackName));
      storage.forEach((music) => {
        music.isCheck = true;
      });
      this.setState({
        isTrue: false,
        array: [...storage, ...newArray],
        prevArray: response,
      });
    }
  };

  render() {
    const { isTrue, array, prevArray } = this.state;
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
