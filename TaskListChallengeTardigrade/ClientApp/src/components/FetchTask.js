import * as React from "react"
import { Link, NavLink } from "react-router-dom"

export class FetchTask extends React.Component {
    constructor() {
        super()
        this.state = { taskList: [], loading: true }
        

        fetch("https://localhost:7108/api/Task/Index")
            .then(response => response.json())
            .then(data => {
                this.setState({ taskList: data, loading: false })
            })

        // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    render() {
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderTaskTable(this.state.taskList)
        )

        return (
            <div>
                <h1>Task Data</h1>
                <p>This component demonstrates fetching Task data from the server.</p>
                <p>
                    <Link to="/addtask">Create New</Link>
                </p>
                {contents}
            </div>
        )
    }

    handleDelete(name) {
        if (!window.confirm("Do you want to delete task: " + name)) return
        else {
            fetch("https://localhost:7108/api/Task/Delete/" + name, {
                method: "delete"
            }).then(data => {
                this.setState({
                    taskList: this.state.taskList.filter(rec => {
                        return rec.name !== name
                    })
                })
            })
        }
    }

    handleEdit(name) {
        window.location.replace("/task/edit/" + name)
    }

    handleDetails(name) {
        window.location.replace("/fetchtask/" + name)
    }

    // Returns the HTML table to the render() method.
    renderTaskTable(taskList) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>DueDate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map(task => (
                        <tr key={task.name}>
                            <td></td>
                            <td className="action" onClick={id => this.handleDetails(task.name)}>{task.name}</td>
                            <td>{(task.dueDate).split("T")[0]}</td>
                            <td>{task.status}</td>
                            <td>
                                <a
                                    className="action"
                                    onClick={id => this.handleEdit(task.name)}
                                >
                                    Edit
                                </a>{" "}
                                |
                                <a
                                    className="action"
                                    onClick={id => this.handleDelete(task.name)}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export class TaskData {
    Name = ""
    Description = ""
    DueDate = ""
    Status = ""
}
