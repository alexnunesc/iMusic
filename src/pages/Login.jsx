import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import './Login.css';
import { getUsers } from '../services/teste';

export default class Login extends Component {
  state = { // Criando state
    name: '',
    senha: '',
    btnDis: true, // quando true deixa o botão sesabilitado
    carregar: false, // quando false deixa o Carregando invisivel
    iMusic: true,
    /* user: [], */
  };

  isV = async () => {
    const favorites = await getUsers();
    const { name, senha } = this.state;
    return favorites
      .some((h) => h.name === name && h.senha === senha);
  };

  // Essa função é chamada após seta um novo state dentro do handleChange
  validation = async () => { // função de validação
    const { name } = this.state;
    const n = 3;
    const valid = name.length >= n;
    this.setState({ // setando um novo valor para o estado btnDis
      btnDis: !(valid),
      /* user: { name, senha }, */
    });
  };

  // Essa função é chamada quando ocore uma alteração no input
  handleChange = ({ target }) => { // desestruturando o evet
    const { value, name } = target; // pegando o valor do input via target
    this.setState({
      [name]: value, // setando um novo valor para o state com a chave NAME
    }, this.validation); // chamando um função de validação como segudo paramentro do setState
  };

  handleFncs = async () => {
    const { history } = this.props; // pegando o history
    const { name, senha } = this.state; // as informações necesarias par a api.
    // setando o state carregar como true para que o componente carrega apareçe na tela
    this.setState({ carregar: true }, async () => { // como segundo param, estou fazendo um IF para verifica se name
      /* const { user } = this.state; */
      /*  const vd = await this.isFarovite(); */
      // farei uma verificação usando o if.
      /* await addUser(user); */
      if (name) {
        await createUser({ name, senha }); // passando o valor do state name como param, para a função, salva os dados do usuario.
      }
      console.log(await this.isV());
      if (await this.isV() === false) {
        return history.push('/cadastra');
      }
      return history.push('/search'); // redirecionando da pagina atual, para o search , usando history.push.
    });
  };

  aprecer = () => {
    this.setState({
      iMusic: false,
    });
  };

  redirect = () => {
    const { history } = this.props;
    return history.push('/cadastra');
  };

  /* --------------------------------------------------- */
  /* async componentDidMount() { // ao inicia a pagina state
    await this.handleFavorite();
  }
 */

  /* xablau = async () => { //  pegando via tagert a propiedade checked do input
    const { user } = this.state; // pegando a props music vindo do album, que é um objeto com dados dos albuns de musica.
    const vd = await this.isFarovite();
    // farei uma verificação usando o if.
    if (!vd) { // se o valor do checked do input estive true.
      await addUser(user); // adicionar musica como favorita.
    } else { // se não.
      await removeUser(user); // remover musica dos favoritos.
    }
  }; */

  /*  isFarovite = async () => {
    const favorites = await getUsers(); // essa função retonar o array de musicas favoritadas.
    const { user } = this.state; // pegando a props music vindo do album, que é um objeto com dados dos albuns de musica, e fazemos a desestruturação dese objeto, para pega o ID(trackId).
    return favorites.map((favorite) => favorite === user); // fazemos o map no array retonado, e verificamos se em cada musica existe um ID(favorite.trackId) igual ao ID(trackId) que recuperamos da props acima. ou seja para sabe se a musica é favorita ou não, e no final retorna true ou false.
  }; */
  /* --------------------------------------------------- */

  render() {
    const { name, senha, btnDis, carregar, iMusic } = this.state;

    return (
      <div className="paiPai">
        { iMusic ? (
          <button
            className="btn"
            type="button"
            onClick={ this.aprecer }
          >
            <h1 className="sic">iMusic</h1>
          </button>)
          : (
            <div className="conteinerLogin" data-testid="page-login">
              <div>
                <button
                  type="button"
                  disabled={ !btnDis }
                  onClick={ this.redirect }
                >
                  Cadastra

                </button>
              </div>
              <fieldset className="fieldName">
                <legend>Login:</legend>
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  placeholder="Digite seu nome"
                  value={ name }
                  onChange={ this.handleChange }
                />

                <input
                  type="text"
                  name="senha"
                  placeholder="Digite ssenha"
                  value={ senha }
                  onChange={ this.handleChange }
                />

                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ btnDis }
                  onClick={ this.handleFncs }
                >
                  Entrar

                </button>
                { carregar && <Carregando /> }
                {/* se carregar fo verdade, exibir o Carregando */}
              </fieldset>
            </div>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
