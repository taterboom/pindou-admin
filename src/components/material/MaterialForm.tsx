import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import ImageUpload from './ImageUpload';
import { FormComponentProps } from 'antd/lib/form';
import { MaterialFile, Material, CommonFile } from '../../entity';
import UserTable from '../user/UserTable';
import UserSelect from '../user/UserSelect';
import CategorySelect from '../category/CategorySelect';
import BgFormInput from './BgFormInput';
import ColorPicker from '../ColorPicker';

interface uploadFile{
  uid: string,
  url: string,
  name: string,
  status: string,
  response?: {
    status: number,
    file: MaterialFile,
  }
}

function fileCommon2Upload(file: CommonFile): uploadFile {
  const { id, fileName, filePath, } = file;
  return {
    uid: id + '',
    url: filePath,
    name: fileName,
    status: 'done',
  }
}

function fileUpload2Common(file: uploadFile): CommonFile {
  const { uid, url, name, } = file;
  return {
    id: +uid,
    filePath: url,
    fileName: name,
  }
}

interface MaterialFormProps extends FormComponentProps{
  onSubmit: (value: Material) => Promise<any>;
  title?: string,
  desc?: string,
  files?: MaterialFile[],
  value?: Material,
}

const formLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 14 },
  },
}

const MaterialForm: React.SFC<MaterialFormProps> = ({ form, onSubmit, value }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const submit = useCallback(() => {
    form.validateFields((err, value) => {
      console.log('material form:', value);
      if (!err) {
        const formattedParams = {
          ...value,
          files: value.files.map((file: uploadFile) => file.response ? file.response.file : fileUpload2Common(file)),
          coverId: value.cover[0].response ? value.cover[0].response.file.id : value.cover[0].uid,
        }
        setIsSubmiting(true);
        onSubmit(formattedParams);
      }
    });
  }, [form, onSubmit]);

  const {getFieldDecorator} = form;

  return (
    <Form {...formLayout}>
      <Form.Item label="Title">
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'title is required!' }],
          initialValue: value ? value.title : ''
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Desc">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'desc is required!' }],
          initialValue: value ? value.description : ''
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Cover">
        {getFieldDecorator('cover', {
          rules: [{ required: true, message: 'cover is required!' }],
          valuePropName: 'fileList',
          getValueFromEvent: e => e,
          initialValue: value ? [fileCommon2Upload(value.cover)] : []
        })(<ImageUpload single/>)}
      </Form.Item>
      <Form.Item label="BG">
        {getFieldDecorator('background', {
          rules: [{ required: true, message: 'BG is required!' }],
          valuePropName: 'value',
          getValueFromEvent: e => e,
          initialValue: value ? value.background : '',
        })(<BgFormInput />)}
      </Form.Item>
      <Form.Item label="Files">
        {getFieldDecorator('files', {
          rules: [{ required: true, message: 'files is required!' }],
          valuePropName: 'fileList',
          getValueFromEvent: e => e,
          initialValue: value ? value.files.map(fileCommon2Upload) : [],
        })(<ImageUpload multiple/>)}
      </Form.Item>
      <Form.Item label="Users">
        {getFieldDecorator('users', {
          rules: [{ required: true, message: 'users is required!' }],
          valuePropName: 'value',
          getValueFromEvent: e => e,
          initialValue: value ? value.users : [],
        })(<UserSelect />)}
      </Form.Item>
      <Form.Item label="Category">
        {getFieldDecorator('categoryId', {
          rules: [{ required: true, message: 'category is required!' }],
          valuePropName: 'value',
          getValueFromEvent: e => e,
          initialValue: value ? value.category.id : '',
        })(<CategorySelect />)}
      </Form.Item>
      <Button type="primary" onClick={submit} loading={isSubmiting}>提交</Button>
    </Form>
  )
}

export default Form.create<MaterialFormProps>({name: 'materialForm'})(MaterialForm);