import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.storage();
  }

  storage = async () => {
    const { music } = this.props;
    const getStorage = await getFavoriteSongs();
    const teste = getStorage.some((obj) => obj.trackName === music.trackName);
    if (teste) {
      this.setState({
        isChecked: true,
      });
    }
  };

  handleChecked = async ({ target }, music) => {
    this.setState({
      isTrue: false,
      isChecked: target.checked,
    });
    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      isTrue: true,
      isChecked: target.checked,
    });
  };

  render() {
    const { music } = this.props;
    const { isTrue, isChecked } = this.state;
    return (
      <div>
        {isTrue && (
          <li>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label data-testid={ `checkbox-music-${music.trackId}` }>
              Favorita
              <input
                type="checkbox"
                checked={ music.isCheck ? true : isChecked }
                onChange={ (event) => this.handleChecked(event, music) }
              />
            </label>
          </li>
        )}
        { !isTrue && <Carregando /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    isCheck: PropTypes.bool.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
