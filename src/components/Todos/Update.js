import React, { Component } from 'react';

// Http Services
import * as HttpTodosServices from '../../Services/Http/TodosServices';

// Components
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';

class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            task: '',
            errorMsg: '',
            onLoadProcess: false,
        }
    }

    componentDidMount() {
        this.setState({ onLoadProcess: true });
        HttpTodosServices.getTodo(this.state.id)
            .then(({data: {data: todo}}) => { 
                this.setState({task : todo.task, onLoadProcess: false})
            })
            .catch(error => {
                this.setState({ errorMsg: 'Error retrevering data', onLoadProcess: false })
            })
    }

    // Map Data Form
    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    // Event Submit Form
    submitHandler = e => {
        e.preventDefault();

        this.setState({ onLoadProcess: true });
        HttpTodosServices.update(this.state)
            .then(({data}) => {
                this.state.refreshData();
                this.state.cancelUpdate();
                this.setState({ task: '', errorMsg: '', onLoadProcess: false });
            })
            .catch((error) => {
                this.setState({ errorMsg: 'Error updating todo', onLoadProcess: false });

                // Validations errors
                if (error?.response?.status && error?.response?.status === 409) return this.setState({ errorMsg: 'The todo is already exist' });
                if (error?.response?.status && error?.response?.status === 422) return this.setState({ errorMsg: 'Error validating form data' });

                this.setState({ errorMsg: 'Error updating todo'});
            });
    }

    render() {
        const { cancelUpdate, errorMsg, onLoadProcess } = this.state;

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input
                        type="text"
                        name="task"
                        autoComplete="off"
                        value={this.state.task}
                        onChange={this.changeHandler}
                    />

                    { onLoadProcess ? <SpinnerLoading /> : '' }
                    { errorMsg ? <div className="alert alert-error">{errorMsg}</div> : null }
                    <button className="btn btn-submit btn-w100" type="submit" disabled={onLoadProcess}>save</button>
                    <button className="btn btn-todo-delete btn-w100" type="button" onClick={() => cancelUpdate()} disabled={onLoadProcess}>cancel</button>
                </form>
            </div>
        )
    }
}

export default Update;
