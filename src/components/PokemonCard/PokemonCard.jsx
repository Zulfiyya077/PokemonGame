import PropTypes from 'prop-types';
import { getPokemonImageUrl } from '../../data/pokemonData';
import Button from '../Button/Button';
import styles from './PokemonCard.module.css';

const PokemonCard = ({pokemon, addPokemonToTeam, onAboutClick}) => {
    const handleAddClick = () => {  
        addPokemonToTeam({...pokemon, count: 1});
    }

    const getTypeBackground = (type) => {
        const typeColors = {
            grass: 'linear-gradient(135deg, #a5d6a7 0%, #81c784 50%, #66bb6a 100%)',
            fire: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)',
            water: 'linear-gradient(135deg, #b2dfdb 0%, #80cbc4 50%, #4db6ac 100%)',
            electric: 'linear-gradient(135deg, #c5e1a5 0%, #aed581 50%, #9ccc65 100%)',
            fairy: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
            normal: 'linear-gradient(135deg, #f1f8f4 0%, #e8f5e9 50%, #c8e6c9 100%)',
            psychic: 'linear-gradient(135deg, #c5e1a5 0%, #aed581 50%, #9ccc65 100%)',
            ghost: 'linear-gradient(135deg, #b2dfdb 0%, #80cbc4 50%, #4db6ac 100%)',
            default: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
        };
        return typeColors[type?.toLowerCase()] || typeColors.default;
    };

  return (
    <div className={styles.pokemonCard} style={{ background: getTypeBackground(pokemon.type) }}>
      <img 
        src={getPokemonImageUrl(pokemon.id)} 
        alt={pokemon.name}
        className={styles.pokemonImage}
      />
      <h3 className={styles.pokemonName}>{pokemon.name}</h3>
      <div className={styles.buttonGroup}>
        <Button 
          variant="info" 
          size="small" 
          fullWidth
          onClick={() => onAboutClick(pokemon)}
        >
          About
        </Button>
        <Button 
          variant="primary" 
          size="small" 
          fullWidth
          onClick={handleAddClick}
        >
          Add to Team
        </Button>
      </div>
    </div>
  );
};


PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  addPokemonToTeam: PropTypes.func.isRequired,
  onAboutClick: PropTypes.func.isRequired,
};

export default PokemonCard;

