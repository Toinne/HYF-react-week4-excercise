import { Redirect } from 'react-router-dom';

import './TodoForm.css';
import Api from './api';

class AddTodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const todoData = new FormData(event.target);

        await Api.addTodo({
            description: todoData.get('description'),
            category: todoData.get('category'),
            deadline: todoData.get('deadline')
        });

        this.setState({
            submitted: true
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="AddTodoForm">

                {this.state.submitted ? <Redirect to="/" /> : null}

                <div>
                    <label htmlFor="description">Description:</label>
                    <input id="description" name="description" type="text" />
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category">
                        <option value="private">private</option>
                        <option value="work">work</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="deadline">Deadline:</label>
                    <input id="deadline" name="deadline" type="date" />
                   
                </div>

                <div>
                    <input type="submit" value="Add" />
                </div>
            </form>
        )
    }
}

export default AddTodoForm;