const baseUrl = 'http://localhost:3001';
const init = {
    headers:{
        'Content-Type': 'application/json'
    },
    mode: 'cors',
};

class Api {

    static async getTodos() {
        const response  = await fetch(`${baseUrl}/todos`, {
            method: 'GET',
            ...init
        });
        return response.json();
    }

    static async addTodo(todo) {
        const response  = await fetch(`${baseUrl}/todos`, {
            method: 'POST',
            ...init,
            body: JSON.stringify(todo)
        });
        return response.json();
    }

    static async getTodo(id) {
      return await fetch(
        `${baseUrl}/todos/${id}`
      ).then(response => response.json());
    }

    static async editTodo(id, todo) {
      return await fetch(
        `${baseUrl}/todos/${id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(todo)
        }
      ).then(response => response.json());
    }

    static async deleteTodo(id, todo) {
      return await fetch(
        `${baseUrl}/todos/${id}`, {
          method: 'DELETE',
          ...init,
          body: JSON.stringify(todo)
        }
      ).then(response => response.json());
    }


}

export default Api;
