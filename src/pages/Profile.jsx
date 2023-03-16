import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';
// Utilize a função getUser da userAPI para recuperar as informações da pessoa logada.

// Enquanto aguarda a resposta da API, exiba a mensagem Carregando....

// Após receber o retorno da getUser, exiba o nome, o email, a descrição e a imagem da pessoa logada.

// Para exibir a imagem, use a tag HTML img com o atributo data-testid="profile-image";

// Crie um link que redirecione para a página de edição de perfil (rota /profile/edit). Este link deve ter o texto Editar perfil.
class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.fetUser();
  }

  fetUser = async () => {
    const info = await getUser();
    this.setState({
      user: info,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Carregando /> }
        {!isLoading && (
          <div>
            <div>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="foto perfil"
              />
              <Link to="/profile/edit" data-testid="link-to-search">Editar perfil</Link>
            </div>
            <div>
              <h3>Nome</h3>
              <p>{ user.name }</p>
            </div>
            <div>
              <h3>E-mail</h3>
              <p>{ user.email }</p>
            </div>
            <div>
              <h3>Descrição</h3>
              <p>{ user.description }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
