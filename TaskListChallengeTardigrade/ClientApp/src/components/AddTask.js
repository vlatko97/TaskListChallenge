import * as React from "react"
import { TaskData } from "./FetchTask"

export class AddTask extends React.Component {
    constructor() {
        super()

        this.state = { title: "", loading: true, taskData: new TaskData() }

        var taskname = window.location.pathname;

        // This will set state for Edit task
        if (taskname.startsWith("/task/edit")) {
            fetch("https://localhost:7108/api/Task/Details/" + taskname.split('/').pop())
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, taskData: data })
                })
        }

        // This will set state for Add task
        else {
            this.state = { title: "Create", loading: false, taskData: new TaskData() }
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    render() {
        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Task</h3>
                <hr />
                {contents}
            </div>
        )
    }

    // This will handle the submit form event.
    handleSave(event) {
        event.preventDefault()
        const data = new FormData(event.target)

        // PUT request for Edit task.
        if (this.state.taskData.name) {
            fetch("https://localhost:7108/api/Task/Edit", {
                method: "PUT",
                body: data
            })
                .then(response => response.json())
                .then(responseJson => {
                    window.location.replace("/fetchtask")
                })
        }

        // POST request for Add task.
        else {
            fetch("https://localhost:7108/api/Task/Create", {
                method: "POST",
                body: data
            })
                .then(response => response.json())
                .then(responseJson => {
                    window.location.replace("/fetchtask")
                })
        }
    }

    // This will handle Cancel button click event.
    handleCancel(e) {
        e.preventDefault()
        window.location.replace("/fetchtask")
    }

    // Returns the HTML Form to the render() method.
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="Name">
                        Name
                    </label>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="text"
                            name="Name"
                            defaultValue={this.state.taskData.name}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="Description">
                        Description
                    </label>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="text"
                            name="Description"
                            defaultValue={this.state.taskData.description}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="DueDate">
                        DueDate
                    </label>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            type="date"
                            name="DueDate"
                            defaultValue={this.state.taskData.dueDate}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Status">
                        Status
                    </label>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            data-val="true"
                            name="Status"
                            defaultValue={this.state.taskData.status}
                            required
                        >
                            <option value="">-- Select Status --</option>
                            <option value="Complete">Complete</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">
                        Save
                    </button>
                    <button className="btn" onClick={this.handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
}
