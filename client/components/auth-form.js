import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  if (name === 'login') {
    return (
      <div className="main-content-section">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {/* <a href="/auth/google">{displayName} with Google</a> */}
      </div>
    )
  } else if (name === 'signup') {
    return (
      <div className="main-content-section">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="birthday">
              <small>Birthday</small> <br />
              <small>month/day/year</small>
            </label>
            <input name="birthday" type="text" defaultValue="1/1/1970" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <select name="state" type="text">
              <option>AL</option>
              <option>AK</option>
              <option>AZ</option>
              <option>AR</option>
              <option>CO</option>
              <option>CA</option>
              <option>CT</option>
              <option>DE</option>
              <option>FL</option>
              <option>GA</option>
              <option>HI</option>
              <option>ID</option>
              <option>IL</option>
              <option>IN</option>
              <option>IA</option>
              <option>KS</option>
              <option>KY</option>
              <option>LA</option>
              <option>ME</option>
              <option>MD</option>
              <option>MA</option>
              <option>MI</option>
              <option>MN</option>
              <option>MS</option>
              <option>MO</option>
              <option>MD</option>
              <option>NE</option>
              <option>NV</option>
              <option>NH</option>
              <option>NJ</option>
              <option>NM</option>
              <option>NY</option>
              <option>NC</option>
              <option>ND</option>
              <option>OH</option>
              <option>OK</option>
              <option>OR</option>
              <option>PA</option>
              <option>RI</option>
              <option>SC</option>
              <option>SD</option>
              <option>TN</option>
              <option>TX</option>
              <option>UT</option>
              <option>VT</option>
              <option>VA</option>
              <option>WA</option>
              <option>WI</option>
              <option>WV</option>
              <option>WY</option>
              <option>DC</option>
            </select>
          </div>
          <div>
            <label htmlFor="zipCode">
              <small>Zip Code</small>
            </label>
            <input name="zipCode" type="text" />
          </div>
          <div>
            <label htmlFor="country">
              <small>Country</small>
            </label>
            <input name="country" type="text" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  let dispatchLogin = evt => {
    evt.preventDefault()
    let userInfo = {
      email: evt.target.email.value,
      password: evt.target.password.value
    }
    const formName = evt.target.name
    dispatch(auth(formName, userInfo))
  }
  let dispatchSignup = evt => {
    evt.preventDefault()
    let userInfo = {
      email: evt.target.email.value,
      password: evt.target.password.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      birthday: Date.parse(`${evt.target.birthday.value} 00:00:00 GMT`),
      address: evt.target.address.value,
      country: evt.target.country.value,
      state: evt.target.state.value,
      zipCode: evt.target.zipCode.value
    }
    const formName = evt.target.name
    dispatch(auth(formName, userInfo))
  }

  return {
    async handleSubmit(evt) {
      if (evt.target.name === 'login') {
        console.log('handleSubmit with login name called in auth-form.js')
        await dispatchLogin(evt)
      } else if (evt.target.name === 'signup') {
        console.log('handleSubmit with signup name called in auth-form.js')
        await dispatchSignup(evt)
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
