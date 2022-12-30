import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateUser } from '../services/userAPI';
import Carregando from './Carregando';

const data = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default class Edit extends Component {
  state = {
    ...data,
    carregar: false,
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onSaveButtonClick = async () => {
    const { name, email, description, image } = this.state;
    /* pegando as informações para criar os cards */
    const newCard = { name, email, description, image };
    /* salvando novos cards */
    this.setState({
      carregar: true,
    });
    await updateUser(newCard);
    this.setState({
      carregar: false,
    });
    /* carregar: false,
    return <Link to="/profile" />; */
  };

  /* se = () => {
    const { data } = this.state;
    this.setState({
      data,
    }, async () => {
      await updateUser(data);
    });
  }; */

  render() {
    const { name, email, description, image, carregar } = this.state;
    return (
      <div>
        { carregar ? <Carregando />
          : (
            <fieldset>

              <legend>Informções</legend>

              <label htmlFor="info">
                Nome:
                <input
                  type="text"
                  placeholder="Nome"
                  name="name"
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info">
                E-mail:
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info">
                Foto:
                <input
                  type="text"
                  name="image"
                  value={ image }
                  placeholder="URL da sua foto"
                  data-testid="edit-input-image"
                  onChange={ this.onInputChange }
                />
              </label>

              <label htmlFor="info">
                Descrição:
                <input
                  type="text"
                  name="description"
                  value={ description }
                  placeholder="Descrição"
                  data-testid="edit-button-save"
                  onChange={ this.onInputChange }
                />
              </label>

              <Link to="/profile">
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.onSaveButtonClick }
                >
                  Salvar

                </button>

              </Link>
            </fieldset>)}
      </div>
    );
  }
}
