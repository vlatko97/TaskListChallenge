import * as React from "react"
import { TaskData } from "./FetchTask"

export class DetailsTask extends React.Component {
    constructor() {
        super()
        this.state = { title: "Details", loading: true, task: new TaskData() }

        fetch("https://localhost:7108/api/Task/Details/" + window.location.pathname.split('/').pop())
            .then(response => response.json())
            .then(data => {
                this.setState({ title: "Details", loading: false, task: data })
            })
        this.handleBack = this.handleBack.bind(this)
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderDetailsForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <hr />
                {contents}
            </div>
        )
    }

    // This will handle Back button click event.
    handleBack(e) {
        e.preventDefault()
        window.location.replace("/fetchtask")
    }

    // Returns the HTML Form to the render() method.
    renderDetailsForm() {
        return (
            <form>
                <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.task.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{this.state.task.description}</td>
                    </tr>
                    <tr>
                        <td>DueDate</td>
                        <td>{(this.state.task.dueDate).split("T")[0]}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{this.state.task.status}</td>
                    </tr>
                </tbody>
            </table>
            <div className="form-group">
                    <button className="btn default" onClick={this.handleBack}>
                        Back
                    </button>
            </div>
            </form>
        )
    }
}
