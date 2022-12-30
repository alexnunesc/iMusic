import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    url: undefined,
    musica: undefined,
    album: undefined,
  };

  componentDidMount() {
    this.handleApiMusic();
  }

  handleApiMusic = async () => {
    // pegar o id que se  encontrar dentro do params.
    const { match: { params: { id } } } = this.props; // pegar o id do album selecionado, para criar uma nova rotar(url) para cada album clicado..
    const getMusic = await getMusics(id); // essa função retonar um array com as muiscas do album referente ao id passado anteriomente, cada id serve para criar uma rota, que leva para a URL da página que contem as músicas do album clicado.
    console.log(getMusic);
    this.setState({
      url: getMusic.slice(1), // selecionar de qual posição do array vai começar.
      album: getMusic[0].collectionName, // pegar a posição 0 do array ,pq nesse obj contem as infromaçõe nome e album.
      musica: getMusic[0].artistName,
    });
  };

  render() {
    const { album, musica, url, id } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ musica }</h1>
        <h2 data-testid="album-name">{ album }</h2>
        <div>
          {/* map para renderizar cada obj do array com informações de musicas, no componente MusicCard */}
          {url ? url.map((music) => (<MusicCard
            key={ music.trackId }
            music={ music }
            id={ id }
            /* teste={ () => {} } */ // bucar explicação.
          />)) /* enviando os dados via props 'music' */
            : null}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
