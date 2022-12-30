import React, { Component } from 'react';
import Card from '../components/Card';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

const numero2 = 2; // const usada para fazer verificação do button, na função handleChange1.

export default class Search extends Component {
  state = { // Criando state
    nameAlbum: 'alex',
    album: undefined,
    artitas: undefined,
    btnDs: true, // quando true deixa o botão desabilitado
    carregar: false, // quando false deixa o Carregando invisivel
  };

  componentDidMount() {
    this.handleFunc1();
  }

  // Essa função é chamada quando ocore uma alteração no input
  handleChange1 = ({ target: { value } }) => { // desestruturando o event.target.value.
  // pegando o valor do input via target
    this.setState({
      nameAlbum: value, // setando um novo valor para o state com a chave , com o valor recebido do input via target.
      btnDs: value.length < numero2,
    }); // Fazendo a verificação  se o tamnho do  valor digitado no input é maior que 2, usando uma const criada previamente.
  };

  handleFunc1 = () => {
    const { nameAlbum } = this.state;
    // setando o state carregar como true para que o componente carrega apareçe na tela
    this.setState({ carregar: true }, async () => { // como segundo param, estou fazendo uma requisição na api, e salvando os valores na const.
      const albuns = await searchAlbumsAPI(nameAlbum); // passando o valor do state nameAlbum como param, para a função, para recbe um array de objetos.
      const dataAlbum = albuns.length > 0 ? albuns : undefined; // se for vazia, retonar undefined, para pode fazer a msg 'Nenhum álbum foi encontrado' aparecer na tela mais abaixo.
      this.setState({
        album: dataAlbum, // setando o valor do state para o array de albuns , recebidos da api
        artitas: nameAlbum, // adicioando o valor digitado al state nome do artista
        carregar: false, // faazendo o carregar desaparcer da tela
        nameAlbum: '', // resetando o valor do state, que receber previamente o valor digitado no input
      });
    });
  };

  render() {
    const { nameAlbum, btnDs, carregar, artitas, album } = this.state;
    return (
      <div className="Conteiner1">
        <Header />
        <div className="Conteiner2">

          { carregar ? <Carregando />
            : (
              <div className="ConteinerInputs">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Pesquisar"
                  name="nameAlbum"
                  value={ nameAlbum }
                  onChange={ this.handleChange1 }
                  onKeyDown={ (e) => e.key === 'Enter' && this.handleFunc1() } // usar enter no input
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ btnDs }
                  onClick={ this.handleFunc1 }
                >
                  Pesquisar
                </button>
              </div>) }
        </div>

        {/* se album for sem valor exibir uma msg */}
        <p>
          { album === undefined ? 'Nenhum álbum foi encontrado' : null }
        </p>

        {/* se artista e albuns forem true fazer isso */}
        <p>
          { artitas && album ? `Resultado de álbuns de: ${artitas}` : null }
          {' '}
        </p>

        {/* se album for true fazer o map, no CArd pansando cada objeto como prop 'albuns' */}
        <div className="ConteinerAlbuns">
          {
            album ? album.map((elemet) => (
              <div key={ elemet.collectionId } className="albuns">
                <Card albuns={ elemet } />
              </div>
            )) : null
          }
        </div>
      </div>
    );
  }
}
