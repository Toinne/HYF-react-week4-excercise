import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './EditForm.css';
import Api from './api';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            todo: []
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const todo = await Api.getTodo(id);
        console.log(todo);
        this.setState({
            todo
        })

    }

    handleSubmit = async (event) => {
        event.preventDefault();


        const todoData = new FormData(event.target);
        const id = this.props.match.params.id;

        await Api.editTodo(id, {
            description: todoData.get('description'),
            category: todoData.get('category')
        });

        this.setState({
            submitted: true
        }
        )
    };

    render() {
        console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit} className="EditForm">

                {this.state.submitted ? <Redirect to="/" /> : null}

                <div>
                    <label htmlFor="description">Description:</label>

                    <input id="description" name="description" value={this.state.todo.description} type="text" />

                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" >
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
