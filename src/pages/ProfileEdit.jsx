import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      check: true,
    };
  }

  componentDidMount() {
    this.userStorage();
  }

  userStorage = async () => {
    const user = await getUser();
    this.setState({
      isLoading: false,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
    const fix = 2;
    const { name, email, image, description } = this.state;
    const array = [
      name.length >= fix,
      email.length >= fix && email.includes('@'),
      image.length >= fix,
      description.length >= fix,
    ];
    if (array.every((item) => item === true)) {
      this.setState({
        check: false,
      });
    } else {
      this.setState({
        check: true,
      });
    }
  };

  handleButton = async () => {
    const { name, image, email, description } = this.state;
    const infoUpdate = {
      name,
      email,
      image,
      description,
    };
    await updateUser(infoUpdate);
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const { isLoading, name, email, description, image, check } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading && <Carregando /> }
        { !isLoading && (
          <form>
            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
            />
            <label>
              Nome
              <input
                type="text"
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label>
              Email
              <input
                type="text"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label>
              Descrição
              <input
                type="text"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ check }
              onClick={ this.handleButton }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
