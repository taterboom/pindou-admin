import React, { useCallback } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

interface Props{
  onChange?:(fileList: UploadFile[]) => void,
  single?: boolean,
  multiple?: boolean,
  fileList?: Array<any>,
}

const ImageUpload: React.SFC<Props> = ({onChange, single = false, multiple = false, fileList = []}, ref) => {
  const changeHandler = useCallback((e) => {
    console.log('change', e);
    if (single && e.fileList.length > 1) {
      message.error('single !');
      return false;
    }
    onChange && onChange(e.fileList);
  }, [onChange, single]);
  const limit = useCallback(() => {
    if (single && fileList.length >= 1) {
      return false;
    }
    return true;
  }, [fileList, single]);
  return (
    <div className="clearfix">
      <Upload
        ref={ref}
        action="/api/upload"
        headers={{authorization:localStorage.getItem('token') || ''}}
        listType="picture"
        multiple={multiple}
        fileList={fileList}
        // onPreview={this.handlePreview}
        beforeUpload={limit}
        onChange={changeHandler}
      >
        <Button icon="plus">上传</Button>
      </Upload>
      {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal> */}
    </div>
  )
}

export default React.forwardRef(ImageUpload);