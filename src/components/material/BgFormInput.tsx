import React, { useCallback, ChangeEvent, useState } from 'react';
import { Button, Modal, Input, Radio } from 'antd';
import style from './index.module.scss';
import ColorPicker from '../ColorPicker';
import GradientPicker from '../GradientPicker';

interface BgInpuProps{
  value?: string,
  onChange?: (color: string) => void,
}

const BgInput: React.SFC<BgInpuProps> = ({value = '', onChange}) => {
  const [type, setType] = useState(value.startsWith('linear-gradient') ? '1' : '0');
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={style['bg-input__container']}>
      <div className={style['bg-input__playground']} style={{background: value}}></div>
      {/* <div className={style['bg-input__item']}>color: <Input type="color" value={value} onChange={changeHandler}></Input></div> */}
      <Radio.Group onChange={e => setType(e.target.value)} value={type}>
        <Radio value="0">纯色</Radio>
        <Radio value="1">渐变</Radio>
      </Radio.Group>
      {
        type === '0' && <ColorPicker value={value} onChange={onChange}/>
      }
      {
        type === '1' && <GradientPicker value={value} onChange={onChange}/>
      }
    </div>
  )
}

interface BgFormInputProps{
  onChange?: (color: string) => void,
  value?: string,
}

const BgFormInput: React.SFC<BgFormInputProps> = ({onChange, value}, ref) => {
  const [modalVis, setModalVis] = useState(false);
  // const [color, setValue] = useState(value);
  const openModal = useCallback(() => {
    setModalVis(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVis(false);
  }, []);
  // const selectColor = useCallback(() => {
  //   onChange && onChange(color + '');
  //   closeModal();
  // }, [onChange, closeModal, color]);
  return (
    <div ref={ref}>
      <Button onClick={openModal}>设置背景({value})</Button>
      <Modal
        title="背景设置"
        visible={modalVis}
        // onOk={selectColor}
        onCancel={closeModal}
        footer={null}
      >
        <BgInput value={value} onChange={onChange}/>
      </Modal>
    </div>
  )
}

export default React.forwardRef(BgFormInput);