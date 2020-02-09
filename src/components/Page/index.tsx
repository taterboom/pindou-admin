import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';
import style from './index.module.scss';

interface PageProps{
  onCreate?: () => void,
  createText?: string,
}

const Page: React.SFC<PageProps> = ({ onCreate, createText = '新建', children }) => {
  const location = useLocation();
  return (
    <div className={style.page__container}>
      <div className={style.page__header}>
        <Breadcrumb>
        {
          location.pathname.slice(1).split('/').map(item => <Breadcrumb.Item key="item">{item}</Breadcrumb.Item>)
        }
        </Breadcrumb>
        {
          onCreate && 
          <Button type="primary" icon="plus" onClick={onCreate}>
            {createText}
          </Button>
        }
      </div>
      <div className={style.page__content}>{children}</div>
    </div>
  )
}

export default Page;