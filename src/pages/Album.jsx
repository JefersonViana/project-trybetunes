import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrue: true,
      array: [],
      prevArray: '',
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const response = await getMusics(params.id);
    const newArray = response.filter((_element, index) => index >= 1);
    this.setState({
      array: newArray,
      isTrue: false,
      prevArray: response,
    });
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
                  <MusicCard music={ object } />
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
