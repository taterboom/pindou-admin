import React, {useEffect} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { UserInfo } from '../entity';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store/modules/account';
import { useHistory } from 'react-router';

type Props = {
  form: any
}

const NormalLoginForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, value: UserInfo) => {
      if (!err) {
        dispatch(actions.login(value));
      }
    });
  }

  const isLogin = useSelector(selectors.isLogin);
  const history = useHistory();
  useEffect(() => {
    if (isLogin) {
      history.replace('/user/list');
    }
  }, [isLogin, history]);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your name!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('pwd', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {/* {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="javascript:void(0)">
          Forgot password
        </a> */}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="javascript:void(0)">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'normal_login' })(NormalLoginForm);