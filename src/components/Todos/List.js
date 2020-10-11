import React, { Component } from 'react';

// Components
import Management from './Management';
import Create from './Create';
import Update from './Update';

import Loading from '../Loading/Loading';

// Http Services
import * as HttpTodosServices from '../../Services/Http/TodosServices';

class List extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todos: [],
            id: null,
            errorMsg: null,
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        HttpTodosServices.get()
            .then(({data: {data: todos}}) => {
                this.setState({ todos: [], isLoading: false });
                this.setState({ todos });
            })
            .catch(error => {
                this.setState({ errorMsg: 'Error retrevering data', isLoading: false })
            })
    }

    updateTodo = id => this.setState({ id });

    cancelUpdate = () => this.setState({ id: null });

    refreshData = () => {
        this.setState({ isLoading: true });
        HttpTodosServices.get()
            .then(({data: {data: todos}}) => {
                this.setState({ todos: [], isLoading: false });
                this.setState({ todos });
            })
            .catch(error => {
                this.setState({ errorMsg: 'Error retrevering data', isLoading: false })
            })
    }

    render() {
        const { todos, errorMsg } = this.state;

        return (
            <div className="todo">
                <div className="todo-header">
                    <h1 className="todo-title">TODOS</h1>
                    { this.state.isLoading ? <Loading /> : null }
                </div>
                <div className="todo-container">
                    <div className="todo-list">
                        {
                            todos.length > 0 ?
                            todos.map(todo => <Management key={todo._id} todo={todo} updateTodo={this.updateTodo} refreshData={this.refreshData} />) :
                            null
                        }
                    </div>
                    { errorMsg ? <div className="alert alert-error">{errorMsg}</div> : null }
                </div>
                <div className="todo-footer">
                    {
                        this.state.id ? <Update id={this.state.id} cancelUpdate={this.cancelUpdate} refreshData={this.refreshData} /> : <Create refreshData={this.refreshData} />
                    }
                </div>
            </div>
        )
    }
}

export default List
