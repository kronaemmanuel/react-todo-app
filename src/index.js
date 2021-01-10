import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import todoData from "./data";

class TodoItem extends React.Component {
  render() {
    const completedStyle = {
      textDecoration: "line-through",
    };
    return (
      <p className="todoitem">
        <input
          type="checkbox"
          checked={this.props.item.completed}
          onChange={() => this.props.handleChange(this.props.item.id)}
          id={this.props.item.id}
        ></input>
        <label
          style={this.props.item.completed ? completedStyle : null}
          htmlFor={this.props.item.id}
        >
          {this.props.item.title}
        </label>
      </p>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: todoData,
      newItem: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json,
          newItem: "",
        });
      });
  }

  handleChange = (itemId) => {
    this.setState((prevState) => {
      const newState = prevState.data.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });

      return { data: newState };
    });
  };

  handleInput = (e) => {
    this.setState({
      newItem: e.target.value,
    });
  };

  addNewTodoItem = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        data: [
          ...prevState.data,
          {
            id: prevState.data.length + 1,
            title: this.state.newItem,
            completed: false,
          },
        ],
        newItem: "",
      };
    });
  };

  render() {
    const todoList = this.state.data.map((item) => (
      <TodoItem key={item.id} item={item} handleChange={this.handleChange} />
    ));

    return (
      <form className="todolist-container">
        <div className="todolist-add">
          <input
            name="newItem"
            placeholder="Enter new Item"
            value={this.state.newItem}
            onChange={this.handleInput}
          />
          <button onClick={this.addNewTodoItem}>Add</button>
        </div>
        {todoList}
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
