import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input } from 'antd';
import { LOGIN_KEY } from 'helpers/settings';
import LocalStorageService from 'services/localStorage';
import { userLogin } from 'services/user';

export default function LoginPage() {
  const loginMutation = useMutation({ 
    mutationKey:['user_login'],
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: (data, variables, context) => {
      LocalStorageService.setItem(LOGIN_KEY, data);
    }
  })

  const onFinish = (values: any) => {
    loginMutation.mutate(values);
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: '¡Por favor ingrese su nombre de usuario!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '¡Por favor ingrese su contraseña!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" className="login-form-button" loading={loginMutation.isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}