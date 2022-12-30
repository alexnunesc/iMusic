/* import React, { Component } from 'react';
import { Link } from 'react-router-dom'; */
/* import Carregando from '../components/Carregando';
import Header from '../components/Header'; */
/* import { getUser } from '../services/userAPI'; */

export default class ProfileEdit extends Component {
  state = {
    /* name: '',
    email: 'email@email.com',
    descricao: 'Olá sou dev tal tal',
    img: 'https://i.pinimg.com/736x/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg',
    carregar: false, */
    /* data: {}, */
  };

  async componentDidMount() { // chama a função apena suma  vez quand o carreagr a pagina
    /* this.loadUser(); */
    /* const data = await getUser(); */
    this.setState({
      /* data, */

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
    /*  const { data: { name, email, description, image }, carregar } = this.state; */
    return (
      {/* <div data-testid="page-profile-edit">
        <Header />
        { carregar ? <Carregando />
          : (
            <>
              <form>
                <img src={ image } alt={ name } />
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{email}</p>
              </form>
              <div>
                <Link
                  to="/edi"
                >
                  Editar
                </Link>
              </div>

            </>)}
      </div> */}
    );
  }
}
