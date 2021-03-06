import { FC } from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidator } from '../../utils/validators/validators'
import styles from './FormsControls.module.css'

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}

export const FormControl: FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error

  return (
    <div className={styles.formControl + ' ' + hasError ? styles.error : ''}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
  // const {input, meta, child, ...restProps} = props
  const { input, ...restProps } = props

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidator>,
  component: FC<WrappedFieldProps>,
  props = {},
  text = ''
) {
  return (
    <div>
      <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
    </div>
  )
}

export type GetStringKeys<T> = Extract<keyof T, string>
