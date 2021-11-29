import { Form, Input, Button, Checkbox, Row, Col, message, Result } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store';
import { Redirect } from 'react-router';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const LoginPage = () => {

  const [form]= Form.useForm()

  const dispatch = useDispatch()

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const error = useSelector((state: AppStateType) => state.auth.error)
  const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
  
  const onFinish = (values: any) => {
    dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFill = () => {
    form.setFieldsValue({
      email: 'frontend.viki@gmail.com',
      password: '134679VIKI',
    });
  };

  if (isAuth) {
    return <Redirect to={'/profile/'}/>
  }

  return (
    <Form
      name="useForm"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
 
    >
      <Form.Item
        label="Email"
        name="email"
        validateTrigger="onBlur"
        rules={[
          { 
            required: true, message: 'Please input your email!' 
          },
          {
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Invalid email address',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        validateTrigger="onBlur"
        rules={[
          { 
            min:5,
            max: 10
          } 
        ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}/>
      </Form.Item>
      
      
      { captchaUrl && error &&
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row justify="center"><img src={captchaUrl}/></Row>
          <Row >
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
      </Form.Item>
      }
    
      {error && message.error(error)
      }


      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Submit
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};