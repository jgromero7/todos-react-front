import React, { Component } from 'react';

// Http Services
import * as HttpTodosServices from '../../Services/Http/TodosServices';

// Components
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            task: '',
            errorMsg: '',
            onLoadProcess: false,
        }
    }

    // Map Data Form
    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    // Event Submit Form
    submitHandler = e => {
        e.preventDefault();

        this.setState({ onLoadProcess: true });
        HttpTodosServices.create(this.state)
            .then(({data}) => {
                this.state.refreshData();
                this.setState({ task: '', errorMsg: '', onLoadProcess: false });
            })
            .catch((error) => {
                this.setState({ onLoadProcess: false });

                // Validations errors
                if (error?.response?.status && error?.response?.status === 409) return this.setState({ errorMsg: 'The todo is already exist' });
                if (error?.response?.status && error?.response?.status === 422) return this.setState({ errorMsg: 'Error validating form data' });
                
                this.setState({ errorMsg: 'Error creating todo' });
            });
    }

    render() {
        const { errorMsg, onLoadProcess } = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                <input
                    type="text"
                    name="task"
                    autoComplete="off"
                    className="input"
                    value={this.state.task}
                    placeholder="Add new todo"
                    onChange={this.changeHandler}
                />
                { onLoadProcess ? <SpinnerLoading /> : '' }
                { errorMsg ? <div className="alert alert-error">{errorMsg}</div> : null }
                <button className="btn btn-submit btn-w100" type="submit" disabled={onLoadProcess}>
                    save
                </button>
            </form>
        )
    }
}

export default Create;
