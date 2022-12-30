import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default class Card extends Component {
  render() {
    const { albuns } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
      trackCount,
    } = albuns;
    const max = 10;

    return (
      <div className="container">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{`${artistName.substring(0, max)}`}</p>
          <p>{`${collectionName.substring(0, max)}`}</p>
          <p>{`Músicas: ${trackCount}`}</p>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistId: PropTypes.number,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.number,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;
