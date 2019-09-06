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
            ...init
        });
        return await response.json();
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
        // throw 'I do not have an implementation yet';
        const response = await fetch(`${baseUrl}/todos/:${id}`, {
            method: 'GET',
            ...init
        });
        //console.log(response.json());
        return response.json();
    }

    static async editTodo(id, todo) {

        // throw 'I do not have an implementation yet';
        const response = await fetch(`${baseUrl}/todos/${id}`, {
            method: 'PUT',
            ...init,
            body: JSON.stringify(todo)
        });

        return response.json();
    }

    static async deleteTodo(id, todo) {
        // throw 'I do not have an implementation yet';
        const response = await fetch(`${baseUrl}/todos/${id}`, {
            method: 'DELETE',
            ...init,

        });

        return response.json();
    }

}

export default Api;