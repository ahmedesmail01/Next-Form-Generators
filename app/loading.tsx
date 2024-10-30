import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin size="large" indicator={<LoadingOutlined spin />} />
    </div>
  );
};

export default loading;
