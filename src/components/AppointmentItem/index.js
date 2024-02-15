import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStar} = props
  const {id, title, date, isStared} = appointmentDetails

  const changeToStared = () => {
    onChangeStar(id)
  }

  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="star-btn-cont">
        <p className="title-para">{title}</p>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={changeToStared}
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date-para">{date}</p>
    </li>
  )
}

export default AppointmentItem
