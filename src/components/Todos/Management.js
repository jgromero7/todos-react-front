import React, { Component } from 'react';
import moment from 'moment';

// Http Services
import * as HttpTodosServices from '../../Services/Http/TodosServices';

// Components
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';

class TodoView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            ...props,
            onLoadProcess: false,
        }
    }

    completeTodo = id => {
        this.setState({ onLoadProcess: true });
        HttpTodosServices.complete({ id, isCompleted: true })
            .then(({data}) => {
                this.state.refreshData();
                this.setState({ errorMsg: '', onLoadProcess: false });
            })
            .catch((error) => {
                this.setState({ errorMsg: 'Error completing todo', onLoadProcess: false });
            });
    }

    destroyTodo = id => {
        this.setState({ onLoadProcess: true });
        HttpTodosServices.destroy(id)
            .then(({data}) => {
                this.state.refreshData();
                this.setState({ errorMsg: '', onLoadProcess: false });
            })
            .catch((error) => {
                this.setState({ errorMsg: 'Error deleting todo', onLoadProcess: false });
            });
    }

    render() {
        const { todo, updateTodo, onLoadProcess } = this.state;

        const newCreatedAt = moment(todo.createdAt).format('LLLL');

        return (
            <div className={ `todo-item ${todo.isCompleted ? 'todo-complete' : ''}` }>
                <div className="todo-text">
                    <div className="todo-task">
                        {todo.task}
                    </div>
                    <div className="todo-date">
                        { newCreatedAt }
                    </div>
                </div>
                
                { onLoadProcess ? <SpinnerLoading /> : null }
                <div className="todo-bottons">
                    {
                        todo.isCompleted ? null :
                        <div>
                            <button className="btn btn-todo-complete" onClick={() => this.completeTodo(todo._id)} disabled={onLoadProcess}><span>&#10003;</span></button>
                        </div>
                    }
                    <div>
                        <button className="btn btn-todo-update" onClick={() => updateTodo(todo._id)} disabled={onLoadProcess}><div className="edit-solid icon"></div></button>
                    </div>
                    <div>
                        <button className="btn btn-todo-delete" onClick={() => this.destroyTodo(todo._id)} disabled={onLoadProcess}><span>&#10007;</span></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoView
