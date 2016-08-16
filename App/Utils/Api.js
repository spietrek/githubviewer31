var Api = {
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
  getSearchUsers(search) {
    search = search.toLowerCase().trim();
    var url = `https://api.github.com/search/users?q=${search}`;
    return fetch(url).then((res) => res.json());
  },
  getNotes(username) {
    username = username.toLowerCase().trim();
    var url = `https://smp-github-react.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => res.json()).catch((error) => { console.error(error); });
  },
  addNote(username, note) {
    username = username.toLowerCase().trim();
    var url = `https://smp-github-react.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    }).then((res) => res.json());
  },
  deleteNote(username, rowID) {
    username = username.toLowerCase().trim();
    var url = `https://smp-github-react.firebaseio.com/${username}/${rowID}.json`;
    return fetch(url, {
      method: 'delete'
    }).then((res) => res.json());
  }
};

module.exports = Api;
