import { Form, Input, Modal } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { actionsProfile } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/redux-store'

type Inputs = {
  about: string
}

export const ProfileForm = () => {
  const {
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      about: ''
    }
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)
  const dispatch = useDispatch()

  return (
    <Modal
      centered
      visible={editMode}
      okText=''
      onCancel={() => dispatch(actionsProfile.setEditMode(false))}
      onOk={() => false}
      footer={null}
    >
      <Form onFinish={handleSubmit(onSubmit)} layout='vertical' name='form_in_modal' initialValues={{ modifier: 'public' }}>
        <Form.Item name='description' label='Description'>
          <Input type='textarea' />
        </Form.Item>
        <Input type='submit' value='submit' />
      </Form>
    </Modal>
  )
}
