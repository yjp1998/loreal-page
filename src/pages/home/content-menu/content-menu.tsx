import { ShoppingOutlined } from '@ant-design/icons';
import { Flex, Input, Menu, MenuProps, Popover } from 'antd';
import { useState } from 'react';
import './content-menu.less';
type MenuItem = Required<MenuProps>['items'][number];

interface ContentMenuProps {
  enterShoppingCar(): void;
}
export const ContentMenu = (props) => {
  const { enterShoppingCar } = props;
  const [current, setCurrent] = useState('mail');
  const shoppingCarContent = (
    <Flex
      className="shopping-car-menu"
      vertical
      justify="center"
      align="center"
    >
      <div className="title">我的购物车</div>
      <div className="item mt-[20px]">
        <div>订单金额：</div>
        <div>¥0</div>
      </div>
      <div className="item count">
        <div>商品数量：</div>
        <div>0件</div>
      </div>
      <div className="go-shopping-car-btn" onClick={enterShoppingCar}>
        前往购物车
      </div>
    </Flex>
  );

  const items: MenuItem[] = [
    {
      label: '首页',
      key: 'home',
    },
    {
      label: '特惠礼包',
      key: 'app',
    },
    {
      label: '欧莱雅国际分销部',
      key: 'SubMenu',
      popupClassName: 'sub-menu-class',
      children: [
        {
          label: (
            <div>
              <img
                src="https://devops01.oss-cn-shanghai.aliyuncs.com/brands/mm.png?x-oss-process=image/format,webp"
                alt=""
              />
              <span>梅森马吉拉</span>{' '}
            </div>
          ),
        },
        {
          label: (
            <div>
              <img
                src="https://devops01.oss-cn-shanghai.aliyuncs.com/brands/mm.png?x-oss-process=image/format,webp"
                alt=""
              />
              <span>梅森马吉拉</span>{' '}
            </div>
          ),
        },
        {
          label: (
            <div>
              <img
                src="https://devops01.oss-cn-shanghai.aliyuncs.com/brands/mm.png?x-oss-process=image/format,webp"
                alt=""
              />
              <span>梅森马吉拉</span>{' '}
            </div>
          ),
        },
        {
          label: (
            <div>
              <img
                src="https://devops01.oss-cn-shanghai.aliyuncs.com/brands/mm.png?x-oss-process=image/format,webp"
                alt=""
              />
              <span>梅森马吉拉</span>{' '}
            </div>
          ),
        },
        {
          label: (
            <div>
              <img
                src="https://devops01.oss-cn-shanghai.aliyuncs.com/brands/mm.png?x-oss-process=image/format,webp"
                alt=""
              />
              <span>梅森马吉拉</span>{' '}
            </div>
          ),
        },
      ],
    },
    {
      key: '大众化妆部',
      label: '大众化妆部',
    },
    {
      key: '皮肤科学美容事业部',
      label: '皮肤科学美容事业部',
    },
    {
      key: '高端化妆品部',
      label: '高端化妆品部',
    },
    {
      key: '专业美发部',
      label: '专业美发部',
    },
    {
      key: 'search-input',
      label: (
        <Input
          className="sku-search-input"
          placeholder="请输入您要搜索的内容"
          // suffix={<SearchOutlined />}
        />
      ),
    },
    {
      key: '我的购物车',
      label: (
        <Popover
          placement="bottomLeft"
          arrow={false}
          content={shoppingCarContent}
        >
          <div>
            <ShoppingOutlined />
            我的购物车(0)
          </div>
        </Popover>
      ),
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className="menu-bar">
      <Menu
        className="bar-content"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
