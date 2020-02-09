import React from 'react';
import Page from '../../components/Page';
import UserTable from '../../components/user/UserTable';

const List: React.FC = (props) => {
  return (
    <Page>
      <UserTable />
    </Page>
  )
}

export default React.memo(List);