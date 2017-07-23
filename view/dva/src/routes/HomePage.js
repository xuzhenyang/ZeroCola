import React from 'react';
import { connect } from 'dva';
import MyLayout from '../components/MyLayout';

function HomePage({ children }) {
  return (
    <div>
      <MyLayout>
         {children} 
      </MyLayout>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
