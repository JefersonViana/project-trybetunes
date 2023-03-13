import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isvalidation: true,
      x: false,
    };
  }

  handleGeneric = ({ target }) => {
    const fix = 3;
    this.setState({
      name: target.value,
    });
    if (target.value.length >= fix) {
      this.setState({
        isvalidation: false,
      });
    } else {
      this.setState({
        isvalidation: true,
      });
    }
  };

  handleClick = (nome) => {
    const name = nome.target.previousElementSibling.firstChild.firstChild.value;
    const object = { name };
    const y = 2000;
    this.setState({
      x: true,
    });
    setTimeout(() => {
      const { history } = this.props;
      history.push('/search');
    }, y);
    createUser(object);
  };

  render() {
    const { name, isvalidation, x } = this.state;
    if (x) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <div>
            <label htmlFor="input-name">
              <input
                type="text"
                id="input-name"
                value={ name }
                placeholder="Digite seu nome"
                data-testid="login-name-input"
                onChange={ this.handleGeneric }
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isvalidation }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
