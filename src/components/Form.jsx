import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  render() {
    const { object } = this.props;
    return (
      <form>
        <div>
          <label>
            <input
              data-testid="search-artist-input"
              onChange={ object.func1 }
              value={ object.inputValue }
              placeholder="Digite a banda ou artista"
            />
          </label>
        </div>
        <button
          data-testid="search-artist-button"
          disabled={ object.isButtonTrue }
          onClick={ object.func2 }
          type="button"
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  object: PropTypes.shape({
    func1: PropTypes.func.isRequired,
    func2: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    isButtonTrue: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Form;
