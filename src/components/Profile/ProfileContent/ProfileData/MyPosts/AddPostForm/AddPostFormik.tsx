import { Field, Form, Formik } from 'formik'
import { FC } from 'react'

type PropsType = {
  addPost: (message: string) => void
}

export type FormType = {
  message: string
}

const AddPostFormik: FC<PropsType> = (props) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmiting: boolean) => void }) => {
    props.addPost(values.message)
    setSubmitting(false)
  }

  return (
    <Formik initialValues={{ message: '' }} onSubmit={submit}>
      {({ isSubmitting }) => (
        <Form>
          <Field name='message' as='textarea' />

          <button type='submit' disabled={isSubmitting}>
            Add
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddPostFormik
