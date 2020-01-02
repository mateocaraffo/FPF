import { createSelector } from "reselect"

const PlayersSelector = state => state.players.data
const FormSelector = state => state.players.currentFilters

export const FilterList = (players, filters) => {
  if (!filters || !filters.values) {
    return players
  }

  const name = filters.values.name || ""
  const age = filters.values.age || 50
  const position = filters.values.position || ""

  // Se filtra la lista
  const filteredList = players.filter(player => {
    const namex = player.name.toLowerCase().includes(name.toLowerCase())
    const ageRange = player.age <= age
    const positionx = player.position === position || position === ""
    return namex && ageRange && positionx
  })
  // Retorna la lista ya filtrada
  return filteredList;
};

export default createSelector(
  PlayersSelector,
  FormSelector,
  FilterList
);
