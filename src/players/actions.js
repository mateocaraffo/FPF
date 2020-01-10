import * as t from "./actionTypes"
import FootballPlayers from "../api/footballPlayers"

const fetchPlayerStart = () => ({
  type: t.FETCH_START
});

const fetchPlayerSuccess = players => ({
  type: t.FETCH_SUCCESS,
  payload: players
});

const fetchPlayerFail = error => ({
  type: t.FETCH_FAIL,
  payload: error
});

export const fetchPlayers = () => dispatch => {
  dispatch(fetchPlayerStart());

  return FootballPlayers
    .get("/players.json")
    .then(res => {
      const players = res.data.map(player => {
        return { ...player, age: calculateAge(player.dateOfBirth) }
      })
      dispatch(fetchPlayerSuccess(players))
      return players
    })
    .catch(error => {
      dispatch(
        fetchPlayerFail(
          "Data fetch failed :("
        )
      )
      return error
    })
};

export const filterPlayers = filters => ({
    type: t.FILTER,
    payload: filters
});

export function calculateAge(birthday) {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
