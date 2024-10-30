import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full min-h-full flex items-center justify-center">
      <Spin size="large" indicator={<LoadingOutlined spin />} />
    </div>
  );
};

export default Loading;
