import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = { // Criando state
    data: [],
    /* btnDs: true, */ // quando true deixa o botão desabilitado
    carregar: false, // quando false deixa o Carregando invisivel
  };

  componentDidMount() {
    this.getMusicas();
  }

  /* removeFavorits = async () => {
    this.setState({
      carregar: true,
    }, async () => {
      const musica = await removeSong();
      this.setState({
        data: musica,
        carregar: false,
      });
    });
  } */
  /* essa função atualizar o statdo das musicas no local sotarage */
  getMusicas = async () => {
    this.setState({
      carregar: true, // quando true deixa o Carregando visivel
    }, async () => {
      const musica = await getFavoriteSongs(); // essa função retonar um array com as musicas faviratas
      this.setState({
        data: musica, // setamos as musicas favoritas no state, para fazemos o map nela mais abaixo.
        carregar: false, // quando false deixa o Carregando invisivel
      });
    });
  };

  render() {
    const { data, carregar } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { carregar ? (<Carregando />) : (data.map((favorits) => (<MusicCard
          music={ favorits }
          key={ favorits.trackId }
          teste={ this.getMusicas } // essa função é passada pro props para o Musiccard, para cada vez que clicamos no checkbox, ela faz a chamada dessa função e a musica desfavoritada somir da tela
        />))) }
        {/* se carregar fo verdade, exibir o Carregando */}
      </div>
    );
  }
}
