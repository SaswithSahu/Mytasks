import './index.css'

const Options = props => {
  const {eachOption, activated, getSelectedTasks} = props

  const onclickTagItem = () => {
    getSelectedTasks(eachOption.optionId)
  }

  return (
    <li>
      <button
        type="button"
        className={activated ? 'button-element-activated' : 'button-element'}
        onClick={onclickTagItem}
      >
        {eachOption.displayText}
      </button>
    </li>
  )
}

export default Options
