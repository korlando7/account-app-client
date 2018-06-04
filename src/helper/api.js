class Api {
  constructor() {
    this.devApiUrl = 'http://localhost:5000/';
  }

  get(path) {
    const url = `${this.devApiUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      method: 'GET',
      headers,
    };

    return fetch(url, data)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  }

  post(path, body) {
    const url = `${this.devApiUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    return fetch(url, data)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  }

  createUser(body) {
    return this.post('user/signup', body);
  }

  searchUser(username) {
    return this.get(`user/signup/${username}`);
  }

  authenticateUser(body) {
    return this.post('user/login', body);
  }
}

module.exports = Api;
