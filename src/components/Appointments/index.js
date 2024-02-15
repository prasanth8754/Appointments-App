import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isFiltered: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  onChangeStared = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

      const newAppointment = {
        id: uuidv4(),
        title,
        date: formatedDate,
        isStared: false,
      }

      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  filterAppointments = () => {
    const {appointmentList} = this.state
    return appointmentList.filter(eachItem => eachItem.isStared === true)
  }

  render() {
    const {appointmentList, title, date, isFiltered} = this.state

    const filteredAppointments = isFiltered
      ? this.filterAppointments()
      : appointmentList

    return (
      <div className="bg-container">
        <div className="container">
          <div className="top-container">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <label htmlFor="title">TITLE</label>
                <input
                  value={title}
                  id="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date">DATE</label>
                <input
                  value={date}
                  id="date"
                  type="date"
                  onChange={this.onChangeDate}
                />
                <button className="add-appointment-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="top-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <div className="stared-container">
            <h1 className="main-heading second-heading">Appointments</h1>
            <button
              className="stared-btn"
              type="button"
              onClick={this.onChangeStared}
            >
              Starred
            </button>
          </div>

          <ul className="ul-container">
            {filteredAppointments.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                onChangeStar={this.onChangeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
