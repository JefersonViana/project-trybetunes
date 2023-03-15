import React from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
    };
  }

  render() {
    const { music, callback, isChecked } = this.props;
    const { isTrue } = this.state;
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
                defaultChecked={ music.isTrue ? true : isChecked }
                onClick={ (event) => callback(event, music) }
              />
            </label>
          </li>
        )}
        { !isTrue && <Carregando /> }
      </div>
    );
  }
}

MusicCard.defaultProps = {
  music: {
    isTrue: false,
  },
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    isTrue: PropTypes.bool,
  }),
  callback: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
