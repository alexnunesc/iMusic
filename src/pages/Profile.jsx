import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUsers } from '../services/teste';
import { getUser } from '../services/userAPI';
import './Profile.css';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    carregar: false,
  };

  async componentDidMount() { // chama a função apena suma  vez quand o carreagr a pagina
    /* this.loadUser(); */
    const data = await getUser();
    this.setState({
      name: data.name,
      email: data.email,
      description: data.description,
      image: data.image,

    });
  }

  /*  loadUser = async () => {
    this.setState({ // fazendo o "Carregando..." aparecer
      carregar: true,
    });

    const data = await getUser(); // recebendo valor do retorno da função
    this.setState({ // fazendo o "Carregando..." sumir
      name: data.name, // setando um novo valor para o state com a chave NAME
      carregar: false,
    });
  }; */

  render() {
    const { name, email, description, image, carregar } = this.state;
    return (
      <div className="conteinerProfile" data-testid="page-profile">
        <Header />

        { carregar ? <Carregando />
          : (
            <div className="paiInteno">
              <div className="name">
                <h2>{ name }</h2>
              </div>
              <div className="conteinerInterno">
                <div className="divImgName">
                  <img src={ image } alt={ name } data-testid="profile-image" />
                </div>

                <div className="divText">
                  <div className="description">
                    <h3>Sobre mim: </h3>
                    <p>{ description }</p>
                  </div>
                  <div className="email">
                    <h3>E-mail: </h3>
                    <p>{ email }</p>
                  </div>
                </div>
              </div>
            </div>)}
        <Link
          className="link"
          to="/profile/edit"
        >
          <p>Editar perfil</p>
        </Link>
      </div>
    );
  }
}
