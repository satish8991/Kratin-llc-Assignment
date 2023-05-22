import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import Header from '../Header'

import initialTipsArray from '../Arrays'

import TipItem from '../TipItem'

import TodoItem from '../TodoItem'

const getTodoListFromLocalStorage = () => {
  const todoListFromLocalStorage = JSON.parse(localStorage.getItem('todoList'))
  if (todoListFromLocalStorage === null) {
    return []
  }
  return todoListFromLocalStorage
}

class HealthGuide extends Component {
  state = {
    tipsArray: initialTipsArray,
    task: '',
    time: '',
    todoList: getTodoListFromLocalStorage(),
  }

  changeShowStatus = id => {
    this.setState(prevState => ({
      tipsArray: prevState.tipsArray.map(each => {
        if (each.id === id) {
          return {...each, show: !each.show}
        }
        return each
      }),
    }))
  }

  changeStatus = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(each => {
        if (id === each.id) {
          return {...each, isDone: !each.isDone}
        }
        return each
      }),
    }))
  }

  deleteItem = id => {
    const {todoList} = this.state
    const filteredList = todoList.filter(each => each.id !== id)
    this.setState({todoList: filteredList})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeTime = event => {
    this.setState({time: event.target.value})
  }

  onClickAddButton = () => {
    const {time, task} = this.state
    if (task === '') {
      alert('Please Enter Your Todo Task')
    } else if (time === '') {
      alert('Please Enter Time')
    } else {
      const newItem = {id: uuidv4(), task, time, isDone: false}
      this.setState(prevState => ({
        todoList: [...prevState.todoList, newItem],
        task: '',
      }))
    }
  }

  onClickSaveButton = () => {
    const {todoList} = this.state
    const stringifiedTodoList = JSON.stringify(todoList)
    localStorage.setItem('todoList', stringifiedTodoList)
  }

  render() {
    const {tipsArray, todoList} = this.state
    return (
      <div className="container">
        <Header />
        <h1 className="heading">Hai Ms Sunita Sharma!</h1>
        <p className="para">
          No matter your age, it’s important to take care of your Health and
          prevent illness.
        </p>
        <p className="paragraph">
          But if you’re 65 or older, something as simple as the flu or a common
          cold can progress and lead to complications. This includes secondary
          infections like pneumonia, bronchitis, an ear infection, or a sinus
          infection. If you have a chronic condition such as asthma or diabetes,
          a respiratory illness can make these worse.
        </p>
        <p className="paragraph">
          Because of this, it’s important to make healthy choices to strengthen
          your immune system and reduce the likelihood of illness.
        </p>
        <p className="paragraph">
          Follow these nine tips to stay healthy year-round.
        </p>
        <ul className="tips-container">
          {tipsArray.map(eachItem => (
            <TipItem
              itemDetails={eachItem}
              key={eachItem.id}
              changeShowStatus={this.changeShowStatus}
            />
          ))}
        </ul>
        <div className="remainder-container">
          <h1 className="remainder-para">
            You can add remainders for your Health Care Tasks at specific time
          </h1>
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            id="task"
            placeholder="Add Your Health Care Task"
            type="text"
            className="task-input"
            onChange={this.onChangeTask}
          />
          <label htmlFor="time" className="label">
            Time
          </label>
          <input
            id="time"
            placeholder="Add Time"
            type="time"
            className="time-input"
            onChange={this.onChangeTime}
          />
          <button
            type="button"
            className="add-button"
            onClick={this.onClickAddButton}
          >
            Add
          </button>
          <ul className="todos-container">
            {todoList.map(each => (
              <TodoItem
                details={each}
                key={each.id}
                changeStatus={this.changeStatus}
                deleteItem={this.deleteItem}
              />
            ))}
          </ul>
          <button
            type="button"
            className="save-button"
            onClick={this.onClickSaveButton}
          >
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default HealthGuide
