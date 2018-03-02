module.exports = {
  actions: {
    deleteTODO: function (data, t) {
      data.todos.splice(t, 1)
      return data
    },
    createTODO: function(data, t) {
      if (!data.todos) data.todos = []
      data.todos.push(t)
      return data
    }
  }
}