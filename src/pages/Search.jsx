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
    };
  }

  componentDidMount() {
    this.teste();
  }

  teste = async () => {
    const response = await getUser();
    this.setState({
      name: response.name,
      isTrue: true,
    });
  };

  render() {
    const { name, isTrue } = this.state;
    const welcome = <h1 data-testid="header-user-name">{ `Welcome, ${name}` }</h1>;
    return (
      <div data-testid="page-search">
        <Header />
        { isTrue ? welcome : <Carregando />}
        {/* <form>
          <div>
            <label>
              <input />
            </label>
          </div>
          <button>Search</button>
        </form> */}
      </div>
    );
  }
}

export default Search;
