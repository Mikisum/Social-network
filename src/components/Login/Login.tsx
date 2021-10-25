import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { required } from '../utils/validators/validators'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router'
import classes from '../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnProps = {
  captchaUrl: string | null
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
     
      { captchaUrl && <img src={captchaUrl}/> }
      { captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {}) }

      {error && <div className={classes.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}



const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login} )(Login)