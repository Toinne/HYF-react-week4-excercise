const baseUrl = 'http://localhost:3001';
const init = {
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
};

class Api {

  static async getTodos() {
    const response = await fetch(`${baseUrl}/todos`, {
      method: 'GET',
      ...init,
      body: JSON.stringify()
    });
    return response.json();

  }

  static async addTodo(todo) {
    const response = await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      ...init,
      body: JSON.stringify(todo)
    });
    return response.json();
  }

  static async getTodo(id) {
    const response = await fetch(`${baseUrl}/todos/${id}`, init, {
      method: 'GET',
      ...init,
      body: JSON.stringify()
    });
    return response.json();
  }

  static async editTodo(id, todo) {
    const response = await fetch(`${baseUrl}/todos/${id}`, init, {
      method: 'POST',
      ...init,
      body: JSON.stringify(todo)
    });
    return response.json();
  }

  static async deleteTodo(id, todo) {
    throw 'I do not have an implementation yet';
  }


}

export default Api;