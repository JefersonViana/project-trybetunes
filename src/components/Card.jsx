import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const fix = 0;
    const { array } = this.props;
    console.log(array);
    if (array.length === fix) {
      return (
        <div>
          <p>Nenhum álbum foi encontrado</p>
        </div>
      );
    }
    return (
      <ul>
        {array.map((obj, index) => (
          <li key={ index }>
            <div>
              <Link
                to={ `/album/${obj.collectionId}` }
                data-testid={ `link-to-album-${obj.collectionId}` }
              >
                { `album 0${index + 1}` }
              </Link>
              <p>{ obj.collectionName }</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

Card.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Card;
