var api = {
  getBio(username) {
     username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;

    return fetch(url).then((res) => res.json());
  },

  getRepos(username) {
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}/repos`;

    return fetch(url).then((res) => res.json());
  },

  getNotes(username) {
    username = username.toLowerCase().trim();
    let url = `http://github-notes-4e526.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => { res.json() });
  },

  addNotes(username, note) {
    username = username.toLowerCase().trim();
    var url = `https://github-notes-4e526.firebaseio.com/${username}.json`;



    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;