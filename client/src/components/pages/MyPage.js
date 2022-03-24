import React from 'react';
import { Route } from 'react-router';
import PageList from '../MyPage/PageList';
import Email from '../MyPage/Section/Email';
import Password from '../MyPage/Section/Password';
import Sendresult from '../MyPage/Section/Sendresult';
import Withdrawal from '../MyPage/Section/Withdrawal';
import Wallet from '../MyPage/Section/Wallet';
import Walletdelete from '../MyPage/Section/Walletdelete';

function MyPage({ match }) {
  return (
    <>
      <Route exact path={match.path} component={PageList} />
      <Route path={`${match.path}/email`} element={Email} />
      <Route path={`${match.path}/password`} element={Password} />
      <Route path={`${match.path}/sendresult`} element={Sendresult} />
      <Route path={`${match.path}/wallet`} element={Wallet} />
      <Route path={`${match.path}/walletdelete`} element={Walletdelete} />
      <Route path={`${match.path}/withdrawal`} element={Withdrawal} />
    </>
  );
}

export default MyPage;