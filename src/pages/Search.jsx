import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Form from '../components/Form';
import Card from '../components/Card';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isTrue: false,
      inputValue: '',
      isButtonTrue: true,
      form: true,
      artistName: '',
      array: [],
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

  fetchMusic = async (artist) => {
    const response = await searchAlbumsAPI(artist);
    this.setState({
      form: true,
      artistName: artist,
      array: response,
    });
  };

  handleClick = () => {
    const { inputValue } = this.state;
    this.setState({
      inputValue: '',
      form: false,
    });
    this.fetchMusic(inputValue);
  };

  render() {
    const {
      name,
      isTrue,
      inputValue, isButtonTrue, form, artistName, array } = this.state;
    const welcome = <h1 data-testid="header-user-name">{ `Welcome, ${name}` }</h1>;
    const objectForm = {
      func1: this.handleChange,
      func2: this.handleClick,
      inputValue,
      isButtonTrue,
    };
    return (
      <div data-testid="page-search">
        <Header />
        { isTrue ? welcome : <Carregando />}
        { form ? <Form object={ objectForm } /> : <Carregando /> }
        { artistName && <p>{ `Resultado de álbuns de: ${artistName}` }</p> }
        { artistName && <Card array={ array } /> }
      </div>
    );
  }
}

export default Search;
