import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    carregar: false, // usado para deix ou não o carregando aparecer na  tela.
    is: false, // usado para definir se o button está habilitado ou não.
  };

  async componentDidMount() { // ao inicia a pagina state
    this.setState({
      is: await this.isFarovite(), // essa função retonar true ou false no carregamento da página, fazendo o 'checked={ is }' fica ficar favorito ou não.
    });
  }

  handleFavorite = async ({ target: { checked } }) => { //  pegando via tagert a propiedade checked do input
    const { music } = this.props; // pegando a props music vindo do album, que é um objeto com dados dos albuns de musica.

    this.setState({
      carregar: true, // quando true, faz o <Carregando... /> aparecer na tela.
    });
    // farei uma verificação usando o if.
    if (checked) { // se o valor do checked do input estive true.
      await addSong(music); // adicionar musica como favorita.
    } else { // se não.
      await removeSong(music); // remover musica dos favoritos.
    }
    this.setState({
      carregar: false, // quando false, faz o <Carregando... /> sumir da tela.
      is: checked, // o valor do checked faz faz o checkbox ficar favorito ou não
    });
  };

  isFarovite = async () => {
    const favorites = await getFavoriteSongs(); // essa função retonar o array de musicas favoritadas.
    const { music: { trackId } } = this.props; // pegando a props music vindo do album, que é um objeto com dados dos albuns de musica, e fazemos a desestruturação dese objeto, para pega o ID(trackId).
    return favorites.map((favorite) => favorite.trackId).includes(trackId); // fazemos o map no array retonado, e verificamos se em cada musica existe um ID(favorite.trackId) igual ao ID(trackId) que recuperamos da props acima. ou seja para sabe se a musica é favorita ou não, e no final retorna true ou false.
  };

  /* remove = async () => {
    const { music } = this.props;
    // pegar o id que se  encontrar dentro do params.
    /* const { match: { params: { id } } } = this.props;
    const getMusic = await getMusics(id); *
    this.setState({
      carregar: true,
    });
    await addSong(music);
    await removeSong(music);
    this.setState({
      carregar: false,
    });
  }; */

  render() {
    const { music, teste } = this.props; // recebendo as props. musica do Albom, teste do Favorites.
    const { carregar, is } = this.state;
    const { trackName, previewUrl, trackId } = music; // desestruturando as props necessárias.
    return (
      <div>
        { carregar && <Carregando /> }
        <p>{ trackName }</p>
        <p>{ trackId }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="mus">
          <p>Favorita</p>
          <input
            type="checkbox"
            name=""
            id="mus"
            checked={ is }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
            onClick={ teste } // cada vez que clicamos aqui chamamos a funçaõ passada por props do Favorites, para fazer as musicas não favorita ssumrem da tela ao serem clicadas.
          />
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }),
}.isRequired;
