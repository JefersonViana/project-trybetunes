import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isTrue: false,
      inputValue: '',
      isButtonTrue: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const response = await getUser();
    this.setState({
      name: response.name,
      isTrue: true,
    });
  };

  handleChange = ({ target }) => {
    const fix = 2;
    this.setState({
      inputValue: target.value,
    });
    if (target.value.length >= fix) {
      this.setState({
        isButtonTrue: false,
      });
    } else {
      this.setState({
        isButtonTrue: true,
      });
    }
  };

  render() {
    const { name, isTrue, inputValue, isButtonTrue } = this.state;
    const welcome = <h1 data-testid="header-user-name">{ `Welcome, ${name}` }</h1>;
    return (
      <div data-testid="page-search">
        <Header />
        { isTrue ? welcome : <Carregando />}
        <form>
          <div>
            <label>
              <input
                data-testid="search-artist-input"
                onChange={ this.handleChange }
                value={ inputValue }
                placeholder="Digite a banda ou artista"
              />
            </label>
          </div>
          <button
            data-testid="search-artist-button"
            disabled={ isButtonTrue }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
