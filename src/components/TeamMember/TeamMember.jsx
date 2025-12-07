import PropTypes from "prop-types";
import { getPokemonImageUrl } from "../../data/pokemonData";
import Button from "../Button/Button";
import styles from "./TeamMember.module.css";

const TeamMember = ({ pokemon, incrementPokemonCount, decrementPokemonCount, deletePokemonFromTeam }) => {
    return (
        <div className={styles.teamMember}>
            <img
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                className={styles.pokemonImage}
            />
            <h3 className={styles.pokemonName}>{pokemon.name}</h3>
            <div className={styles.countControls}>
                <Button 
                    variant="warning"
                    size="medium"
                    circular
                    onClick={() => decrementPokemonCount(pokemon.id)}
                >
                    -
                </Button>
                <span className={styles.count}>{pokemon.count}</span>
                <Button 
                    variant="success"
                    size="medium"
                    circular
                    onClick={() => incrementPokemonCount(pokemon.id)}
                >
                    +
                </Button>
            </div>
            <Button
                variant="danger"
                size="medium"
                onClick={() => deletePokemonFromTeam(pokemon.id)}
            >
                Remove
            </Button>
        </div>
    );
}

TeamMember.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
    }).isRequired,
    incrementPokemonCount: PropTypes.func.isRequired,
    decrementPokemonCount: PropTypes.func.isRequired,
    deletePokemonFromTeam: PropTypes.func.isRequired,
};
export default TeamMember;

