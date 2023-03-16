import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.userStorage();
  }

  userStorage = async () => {
    const usuario = await getUser();
    this.setState({
      user: usuario,
    });
  };

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Music favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <p>{ user.name }</p>
      </header>
    );
  }
}

export default Header;
