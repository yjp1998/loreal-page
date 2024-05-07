import { ShoppingCartOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import './shopping-car.less';

export const ShoppingCar = () => {
  const nonePage = (
    <Flex className="none-page" vertical justify="center" align="center">
      <ShoppingCartOutlined className="icon" />
      <div className="title">
        <div className="tip-1">您的购物车还是空的</div>
        <div className="tip-2">快去选购吧</div>
      </div>
      <div className="go-home-page-btn">去首页逛逛</div>
    </Flex>
  );
  const shoppingCarHeader = (
    <div className="shopping-car-header">我的购物车（0）</div>
  );
  return (
    <div className='shopping-car-container' style={{ color: 'black' }}>
      <Flex justify='start'>{shoppingCarHeader}</Flex>
      {nonePage}
    </div>
  );
};
