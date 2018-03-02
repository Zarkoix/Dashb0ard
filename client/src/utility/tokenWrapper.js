module.exports = {
  getToken: () => {
    if (localStorage) {
      if (localStorage.token) return localStorage.token
      return false
    } else {
      return false
    }
  },

  setToken: (token) => {
    if (localStorage) {
      localStorage.token = token
    } else {
      return false
    }
  }
}