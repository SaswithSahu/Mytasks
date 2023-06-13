const Tags = props => {
  const {each} = props
  return <option value={each.optionId}>{each.displayText}</option>
}

export default Tags
