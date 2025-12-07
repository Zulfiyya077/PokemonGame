import { useState } from "react";
import { createPortal } from "react-dom";
import { pokemonData } from "./data/pokemonData";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import TeamMember from "./components/TeamMember/TeamMember";
import PokemonTable from "./components/PokemonTable/PokemonTable";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [team, setTeam] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPokemonToTeam = (pokemon) => {
    const exists = team.find(p => p.id === pokemon.id);

    if (!exists) {
      setTeam([...team, pokemon]);  

      toast.success(`${pokemon.name} added to your team!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    else {
      toast.info(`${pokemon.name} is already in your team!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };

  const incrementPokemonCount = (id) => {
    const pokemon = team.find(p => p.id === id);
    const pokemonName = pokemon ? pokemon.name : `Pokémon ID ${id}`;
    
    setTeam(team.map(pokemon =>
      pokemon.id === id
        ? { ...pokemon, count: pokemon.count + 1 }
        : pokemon
    ));

    toast.info(`Increased count for ${pokemonName}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const decrementPokemonCount = (id) => {
    const pokemon = team.find(p => p.id === id);
    
    if (!pokemon) return;
    
    const pokemonName = pokemon.name;
    
    // Eğer count 1 ise, Pokémon'u tamamen sil
    if (pokemon.count === 1) {
      setTeam(team.filter(p => p.id !== id));
      toast.error(`${pokemonName} removed from your team`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Eğer count > 1 ise, count'u azalt
      setTeam(team.map(pokemon =>
        pokemon.id === id
          ? { ...pokemon, count: pokemon.count - 1 }
          : pokemon
      ));

      toast.info(`Decreased count for ${pokemonName}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const deletePokemonFromTeam = (id) => {
    const pokemonToRemove = team.find(pokemon => pokemon.id === id);
    const pokemonName = pokemonToRemove ? pokemonToRemove.name : `Pokémon ID ${id}`;
    
    setTeam(team.filter(pokemon => pokemon.id !== id));

    toast.error(`${pokemonName} removed from your team`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAboutClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };


  return (
    <div className="app">
      <h1>Pokémon Team </h1>

      <div className="pokemon-list">
        {pokemonData.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            addPokemonToTeam={addPokemonToTeam}
            onAboutClick={handleAboutClick}
          />
        ))}
      </div>

      <h2>Your Team</h2>
      <div className="team-members">
        {team.length === 0 ? (
          <p>No Pokémon in your team. Add some!</p>
        ) : (
          team.map(pokemon => (
            <TeamMember
              key={pokemon.id}
              pokemon={pokemon}
              incrementPokemonCount={incrementPokemonCount}
              decrementPokemonCount={decrementPokemonCount}
              deletePokemonFromTeam={deletePokemonFromTeam}
            />
          ))
        )}
      </div>
      <p className="total">Total Pokémon in Team: {team.length}</p>

      {team.length > 0 && (
        <>
          <h2>Individual Pokémon Count</h2>
          <PokemonTable team={team} />
        </>
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToTeam={addPokemonToTeam}
      />
      
      {createPortal(<ToastContainer />, document.body)}
    </div>

  );



}

export default App;