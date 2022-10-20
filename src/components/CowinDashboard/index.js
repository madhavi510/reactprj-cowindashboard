// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    cowinDetailsList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const updatedList = {
        lastDaysVaccination: data.last_7_days_vaccination.map(recentData => ({
          VaccineDate: recentData.vaccine_date,
          dose1: recentData.dose_1,
          dose2: recentData.dose_2,
        })),
        vaccineByAge: data.vaccination_by_age.map(recentData => ({
          age: recentData.age,
          count: recentData.count,
        })),
        vaccineByGender: data.vaccination_by_gender.map(recentData => ({
          count: recentData.count,
          gender: recentData.gender,
        })),
      }

      this.setState({
        cowinDetailsList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCoWinDetails = () => {
    const {cowinDetailsList} = this.state

    return (
      <div className="chart-container">
        <VaccinationCoverage
          coverageDetails={cowinDetailsList.lastDaysVaccination}
        />

        <VaccinationByGender
          VaccinationByGenderDetails={cowinDetailsList.vaccineByGender}
        />

        <VaccinationByAge
          VaccinationByAgeDetails={cowinDetailsList.vaccineByAge}
        />
      </div>
    )
  }

  renderFailure = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="err-image"
        alt="failure view"
      />
      <h1 className="error-text">Something Went Wrong </h1>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCowinDashboardDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoWinDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-img"
          />

          <h1 className="logo-title">Co-WIN</h1>
        </div>
        <h1 className="title">CoWIN Vaccination In India</h1>
        <div>{this.renderCowinDashboardDetails()}</div>
      </div>
    )
  }
}
export default CowinDashboard
