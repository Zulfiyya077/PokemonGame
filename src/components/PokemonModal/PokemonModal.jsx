import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getPokemonImageUrl } from '../../data/pokemonData';
import Button from '../Button/Button';
import styles from './PokemonModal.module.css';

const PokemonModal = ({ pokemon, isOpen, onClose, onAddToTeam }) => {
  useEffect(() => {
    if (isOpen) {
      // Body scroll'unu engelle - sadece modal açıkken
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen || !pokemon) return null;

  const getPokemonDescription = (pokemon) => {
    const descriptions = {
      'Charmander': 'Charmander is a Fire-type Pokémon. It has a flame that burns on the tip of its tail from birth. The flame can be used as an indication of Charmander\'s health and emotions.',
      'Squirtle': 'Squirtle is a Water-type Pokémon. It shelters itself in its shell, then strikes back with spouts of water at every opportunity. The shell is not just for protection.',
      'Bulbasaur': 'Bulbasaur is a Grass/Poison-type Pokémon. It can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.',
      'Pikachu': 'Pikachu is an Electric-type Pokémon. When it releases pent-up energy in a burst, the electric power is equal to a lightning bolt. It stores electricity in its cheeks.',
      'Eevee': 'Eevee is a Normal-type Pokémon. It has the ability to alter the composition of its body to suit its surrounding environment. Its irregularly configured DNA is affected by its surroundings.',
      'Jigglypuff': 'Jigglypuff is a Normal/Fairy-type Pokémon. When its huge eyes waver, it sings a mysteriously soothing melody that lulls its enemies to sleep.',
      'Gengar': 'Gengar is a Ghost/Poison-type Pokémon. On the night of a full moon, if shadows move on their own and laugh, it must be Gengar\'s doing.',
      'Mewtwo': 'Mewtwo is a Psychic-type Pokémon. A Pokémon created by genetic manipulation. However, even though the scientific power of humans created this Pokémon\'s body, they failed to endow Mewtwo with a compassionate heart.',
      'Meowth': 'Meowth is a Normal-type Pokémon. It loves to collect shiny things. If it\'s in a good mood, it might even let its Trainer have a look at its hoard of treasures.',
      'Snorlax': 'Snorlax is a Normal-type Pokémon. Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.',
      'Alakazam': 'Alakazam is a Psychic-type Pokémon. Its brain cells multiply continually until it dies. In other words, it can store all the knowledge it gains during its lifetime in its brain.',
      'Dragonite': 'Dragonite is a Dragon/Flying-type Pokémon. It can circle the globe in just 16 hours. It is a kindhearted Pokémon that leads lost and foundering ships in a storm to the safety of land.',
      'Onix': 'Onix is a Rock/Ground-type Pokémon. As it grows, the stone portions of its body harden to become similar to a diamond, but colored black.',
      'Butterfree': 'Butterfree is a Bug/Flying-type Pokémon. In battle, it flaps its wings at high speed to release highly toxic dust into the air.',
      'Rattata': 'Rattata is a Normal-type Pokémon. Bites anything when it attacks. Small and very quick, it is a common sight in many places.',
      'Spearow': 'Spearow is a Normal/Flying-type Pokémon. Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.',
      'Psyduck': 'Psyduck is a Water-type Pokémon. While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers.',
      'Tentacool': 'Tentacool is a Water/Poison-type Pokémon. Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.',
      'Lickitung': 'Lickitung is a Normal-type Pokémon. Its tongue spans almost 7 feet and can move more nimbly than its hands. Its sticky saliva grips everything.',
      'Kangaskhan': 'Kangaskhan is a Normal-type Pokémon. The female raises its young in its belly pouch. It lets the baby out to play only when it feels safe.'
    };
    return descriptions[pokemon.name] || `${pokemon.name} is a ${pokemon.type || 'Normal'}-type Pokémon. A mysterious creature with unique abilities and characteristics.`;
  };

  const handleAddClick = () => {
    onAddToTeam({...pokemon, count: 1});
    onClose();
  };

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalBody}>
          {/* Sol tarafta bilgiler */}
          <div className={styles.infoSection}>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <div className={styles.typeBadge}>
              <span className={styles.typeLabel}>Type:</span>
              <span className={styles.typeValue}>{pokemon.type || 'Normal'}</span>
            </div>
            <div className={styles.pokemonId}>
              <span className={styles.idLabel}>Pokédex #:</span>
              <span className={styles.idValue}>{String(pokemon.id).padStart(3, '0')}</span>
            </div>
            <div className={styles.description}>
              <h3>About</h3>
              <p>{getPokemonDescription(pokemon)}</p>
            </div>
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleAddClick}
              >
                Add to Team
              </Button>
            </div>
          </div>

          {/* Sağ tarafta hareketli resim */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                className={styles.pokemonImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

PokemonModal.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToTeam: PropTypes.func.isRequired,
};

export default PokemonModal;

