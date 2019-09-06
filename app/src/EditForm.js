import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './TodoForm.css';
import Api from './api';
import moment from 'moment';


class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            todo: {},
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const todo = await Api.getTodo(id);
        this.setState({
            todo
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const todoData = new FormData(event.target);

        const id = this.props.match.params.id;
        await Api.editTodo(id ,{
            description: todoData.get('description'),
            category: todoData.get('category'),
            deadline: todoData.get('deadline'),            

        });

        this.setState({
            submitted: true
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TodoForm">

                {this.state.submitted ? <Redirect to="/" /> : null}

                <div>
                    <label htmlFor="description">Description:</label>
                    <input id="description" value={this.state.todo.description} name="description" type="text" />
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category">
                        <option selected={this.state.todo.category === 'private' ? 'selected' : ''} value="private">private</option>
                        <option selected={this.state.todo.category === 'work' ? 'selected' : ''} value="work">work</option>
                    </select>
                </div>

                <div>
                    <input type="submit" value="Edit" />
                </div>
            </form>
        )
    }
}

export default EditForm;
