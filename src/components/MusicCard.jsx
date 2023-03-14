import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
      validation: false,
      array: [],
    };
  }

  handleChecked = async () => {
    const { array } = this.state;
    this.setState({
      isTrue: false,
    });
    const { music } = this.props;
    const response = await addSong(music);
    this.setState({
      isTrue: true,
      validation: true,
      array: [...array, response],
    });
  };

  render() {
    const { music } = this.props;
    const { isTrue, validation } = this.state;
    return (
      isTrue ? (
        <li>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
          </audio>
          <label data-testid={ `checkbox-music-${music.trackId}` }>
            Favorita
            <input
              type="checkbox"
              defaultChecked={ validation }
              onClick={ this.handleChecked }
            />
          </label>
        </li>
      ) : <Carregando />
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
