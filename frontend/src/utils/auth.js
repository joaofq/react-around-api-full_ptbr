export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.joaofq.students.nomoredomainssbs.ru/'
    : 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(res.status + ' Error: ' + res.statusText),
  );
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(res.status + ' Error: ' + res.statusText),
    )
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(res.status + ' Error: ' + res.statusText),
    )
    .then((data) => {
      return data;
    });
};
