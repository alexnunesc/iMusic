/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Header.css';

export default class Header extends Component {
  state = {
    nome: '',
    carregar: false,
  };

  componentDidMount() { // chama a função apena suma  vez quand o carreagr a pagina
    this.loadUser();
  }

  loadUser = async () => {
    this.setState({ // fazendo o "Carregando..." aparecer
      carregar: true,
    });

    const data = await getUser(); // recebendo valor do retorno da função
    this.setState({ // fazendo o "Carregando..." sumir
      nome: data.name, // setando um novo valor para o state com a chave NAME
      carregar: false,
    });
  };

  render() {
    const { carregar, nome } = this.state;
    return (
      <div>
        <h1 className="h1iMusic">iMusic</h1>
        <div className="conteinerHeader">
          <header className="header" data-testid="header-component">
            <nav className="navHeader">
              <Link
                className="navLink"
                data-testid="link-to-search"
                to="/search"
              >
                Search

              </Link>
              <Link
                className="navLink"
                data-testid="link-to-favorites"
                to="/favorites"
              >Favorites
              </Link>
              <Link
                className="navLink"
                data-testid="link-to-profile"
                to="/profile"
              >Profile
              </Link>
            </nav>

            { carregar ? <Carregando />
              : <h1 data-testid="header-user-name">{ nome }</h1> }
            {/* se carregar fo verdade, exibir o Carregando */}
          </header>
        </div>
      </div>
    );
  }
}
