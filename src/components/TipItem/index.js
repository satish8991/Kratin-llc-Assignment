import './index.css'

import {FaChevronDown, FaChevronUp} from 'react-icons/fa'

const TipItem = props => {
  const {itemDetails, changeShowStatus} = props
  const {id, heading, show, description} = itemDetails
  const descrptionClass = show ? 'descrption' : 'hide'
  const buttonClass = show ? 'tip-button selected' : 'tip-button'
  const hideButtonClass = show ? 'hide-button' : 'hide'
  const onClickTipItem = () => {
    changeShowStatus(id)
  }
  return (
    <li className="tip-item-container">
      <button type="button" className={buttonClass} onClick={onClickTipItem}>
        {heading}
        {show ? (
          <FaChevronUp className="icon" />
        ) : (
          <FaChevronDown className="icon" />
        )}
      </button>
      <p className={descrptionClass}>{description}</p>
      <button
        type="button"
        className={hideButtonClass}
        onClick={onClickTipItem}
      >
        Hide
        <FaChevronUp className="icon" />
      </button>
    </li>
  )
}

export default TipItem
