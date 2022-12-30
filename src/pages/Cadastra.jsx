/* eslint-disable no-else-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import { updateUser } from '../services/userAPI';
import './Cadastra.css';
import { addUser } from '../services/teste';

const data = {
  name: '',
  email: '',
  image: '',
  description: '',
  senha: '',
};

export default class Cadastra extends Component {
  state = {
    ...data,
    carregar: false,
    btnValid: true,
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validtion);
  };

  /* função para validação do button */
  validtion = () => {
    const { name, email, image, description } = this.state;

    /* codigo regex para verificação de E-mail */
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const vEmail = regex.test(email);

    /* criando cosnt para depois usar um Every para vericar se todas são TRUE */
    const inputs = [name, email, image, description];
    const inputsValidation = inputs.every((input) => input.length > 0);

    /* setando o state que define se o button está ou não habilitado */
    this.setState({
      btnValid: !(
        vEmail && inputsValidation
      ),
    });
  };

  /* função que salva as novas infrmações do user, e redirecionar para o perfil */
  onSaveButtonClick = async () => {
    /* pegando as informações para criar os cards */
    const { name, email, description, image, senha } = this.state;

    const user = { name, senha };
    console.log(user);
    /* salvando novos cards */
    const newCard = { name, email, description, image, senha };

    /*  usando o history para redireciana para a pagina d eperfil */
    const { history } = this.props;

    this.setState({
      carregar: true,
    }, async () => {
      /* setando os novos dados do usuario com a função updateUser */
      await updateUser(newCard);
      this.setState({
        carregar: false,
      });
      /* no final retono para a rota do perfil, usando o history.push */
      await addUser(newCard);
      return history.push('/profile');
    });
  };

  render() {
    const { name, email, senha, description, image, carregar, btnValid } = this.state;
    return (
      <div className="cadastraConteiner">
        {carregar ? <Carregando />
          : (
            <fieldset className="cadastraFieldeset">

              <legend>Informções</legend>

              <label htmlFor="info1">
                <p>Nome:</p>
                <input
                  type="text"
                  placeholder="Nome"
                  name="name"
                  id="info1"
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info2">
                <p>E-mail:</p>
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  id="info2"
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="info5">
                <p>Senha:</p>
                <input
                  type="text"
                  placeholder="Senha"
                  name="senha"
                  id="info2"
                  value={ senha }
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info3">
                <p>Foto:</p>
                <input
                  type="text"
                  name="image"
                  id="info3"
                  value={ image }
                  placeholder="URL da sua foto"
                  data-testid="edit-input-image"
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info4">
                <p>Descrição:</p>
                <input
                  type="text"
                  name="description"
                  id="info4"
                  value={ description }
                  placeholder="Descrição"
                  data-testid="edit-input-description"
                  onChange={ this.onInputChange }
                />
              </label>

              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.onSaveButtonClick }
                disabled={ btnValid }
              >
                Cadastrar
              </button>

            </fieldset>)}
      </div>
    );
  }
}

Cadastra.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
