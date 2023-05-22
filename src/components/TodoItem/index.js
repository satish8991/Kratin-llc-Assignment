import './index.css'

import {MdOutlineDeleteOutline} from 'react-icons/md'

const TodoItem = props => {
  const {details, changeStatus, deleteItem} = props
  const {id, task, time, isDone} = details
  const hoursValue = parseInt(time.slice(0, 2), 10)
  let resultTime = null
  if (hoursValue > 12) {
    resultTime = `${hoursValue - 12}:${time.slice(3, 5)} PM`
  } else {
    resultTime = `${time} AM`
  }
  const taskClass = isDone ? 'task done' : 'task'
  const onChangeCheckbox = () => {
    changeStatus(id)
  }
  const onClickDeleteButton = () => {
    deleteItem(id)
  }
  return (
    <li className="todo-item">
      <input
        id={id}
        type="checkbox"
        className="checkbox"
        onChange={onChangeCheckbox}
      />
      <label htmlFor={id} className={taskClass}>
        {task}
      </label>
      <p className="time">{resultTime}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteButton}
      >
        <MdOutlineDeleteOutline className="delete-icon" />
      </button>
    </li>
  )
}

export default TodoItem
