const userss = 'userLogin';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(userss))) {
  localStorage.setItem(userss, JSON.stringify([]));
}
const readUser = () => JSON.parse(localStorage.getItem(userss));

const saveUSers = (favoriteSongs) => localStorage
  .setItem(userss, JSON.stringify(favoriteSongs));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUsers = () => new Promise((resolve) => {
  const favoriteSongs = readUser();
  simulateRequest(favoriteSongs)(resolve);
});

export const addUser = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readUser();
    saveUSers(([...favoriteSongs, song]) || []);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeUser = (song) => new Promise((resolve) => {
  const favoriteSongs = readUser();
  saveUSers(favoriteSongs.filter((s) => s !== song));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
