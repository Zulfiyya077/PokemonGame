import PropTypes from "prop-types";
import styles from "./PokemonTable.module.css";

const PokemonTable = ({team }) => {
    return (
        <table className={styles.pokemonTable}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Count</th>
                </tr>
            </thead>    
            <tbody>
                {team.map(pokemon => (
                    <tr key={pokemon.id}>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.type || 'N/A'}</td>
                        <td>{pokemon.count}</td>
                    </tr>
                ))} 
            </tbody>
        </table>
    );
}

PokemonTable.propTypes = {
    team: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default PokemonTable;

