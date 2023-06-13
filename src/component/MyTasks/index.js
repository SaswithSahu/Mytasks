import {Component} from 'react'
import {v4} from 'uuid'
import Tags from '../Tags'
import Options from '../Options'
import Tasks from '../Tasks'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    selectValue: tagsList[0].optionId,
    task: '',
    tasksList: [],
    slectedItem: '',
  }

  updateSelectValue = event => {
    this.setState({selectValue: event.target.value})
  }

  updateTask = event => {
    this.setState({task: event.target.value})
  }

  addTask = () => {
    const {tasksList, selectValue, task} = this.state
    const newTask = {
      id: v4(),
      tasks: task,
      tag: selectValue,
    }
    this.setState({
      tasksList: [...tasksList, newTask],
      selectValue: 'HEALTH',
      task: '',
    })
  }

  getSelectedTasks = otp => {
    const {slectedItem} = this.state
    if (otp !== slectedItem) {
      this.setState({slectedItem: otp})
    } else {
      this.setState({slectedItem: ''})
    }
  }

  renderForm = () => {
    const {selectValue, task} = this.state
    return (
      <>
        <form className="left-container">
          <h1 className="head">Create a task!</h1>
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            value={task}
            className="input-element"
            placeholder="Enter the task here"
            id="task"
            onChange={this.updateTask}
          />
          <label htmlFor="tags" className="label" value={selectValue}>
            Tags
          </label>
          <select
            value={selectValue}
            className="input-element"
            id="tags"
            onChange={this.updateSelectValue}
          >
            {tagsList.map(each => (
              <Tags each={each} key={each.optionId} />
            ))}
          </select>
          <button type="button" className="add-button" onClick={this.addTask}>
            Add Task
          </button>
        </form>
      </>
    )
  }

  renderRight = () => {
    const {tasksList, slectedItem} = this.state
    let updatedTaskList
    if (slectedItem === '') {
      updatedTaskList = tasksList
    } else {
      updatedTaskList = tasksList.filter(each => each.tag === slectedItem)
    }
    return (
      <div className="right-container">
        <h1 className="head1">Tags</h1>
        <ul className="buttons-list">
          {tagsList.map(eachOption => (
            <Options
              eachOption={eachOption}
              key={eachOption.optionId}
              getSelectedTasks={this.getSelectedTasks}
              activated={eachOption.optionId === slectedItem}
            />
          ))}
        </ul>
        <h1 className="head1">Tasks</h1>
        <ul className="tasks-list">
          {updatedTaskList.length > 0 ? (
            updatedTaskList.map(eachTask => (
              <Tasks eachTask={eachTask} key={eachTask.id} />
            ))
          ) : (
            <p className="head1">No Tasks Added Yet</p>
          )}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        {this.renderForm()}
        {this.renderRight()}
      </div>
    )
  }
}

export default MyTasks
