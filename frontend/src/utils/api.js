class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken() {
    const token = localStorage.getItem('jwt');
    this._headers.Authorization = `Bearer ${token}`;
  }

  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  getCardsList() {
    return fetch(this._baseUrl + 'cards', {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  addCard(name, link) {
    return fetch(this._baseUrl + 'cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  deleteCard(_id) {
    return fetch(this._baseUrl + 'cards/' + _id, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  changeLikeCardStatus(_id, isLiked) {
    const likeMethod = isLiked ? 'PUT' : 'DELETE';
    return fetch(this._baseUrl + '/cards/likes/' + _id, {
      headers: this._headers,
      method: likeMethod,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }
}

const token = localStorage.getItem('jwt');

const api = new Api({
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.joaofq.students.nomoredomainssbs.ru/'
      : 'http://localhost:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
