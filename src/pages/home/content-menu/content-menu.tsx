import { mockData } from '@/mock-data/data';
import { ShoppingOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Flex, Menu, MenuProps, Popover, Select } from 'antd';
import { useState } from 'react';
import './content-menu.less';
type MenuItem = Required<MenuProps>['items'][number];

interface ContentMenuProps {
  enterShoppingCar(): void;
}
export const ContentMenu = (props) => {
  const { enterShoppingCar, selectSku, skuList } = props;
  const [current, setCurrent] = useState('mail');

  const [options, setOptions] = useState([]);

  const api = (input: string) => {
    // 返回一个新的 Promise 对象
    return new Promise((resolve, reject) => {
      // 假设这里有异步操作，比如一个 HTTP 请求
      setTimeout(() => {
        const options = mockData
          .filter(
            (item) =>
              item?.name?.includes(input) ||
              item?.search_alias?.includes(input),
          )
          .map((item) => {
            return {
              value: `${item.name}_${item.search_alias}`,
              label: `${
                item?.name?.includes(input) ? item?.name : item?.search_alias
              }`,
            };
          });
        console.log(options);
        resolve(options);
      }, 400); // 模拟网络延迟
    });
  };

  const handleSearch = useDebounceFn(
    (newValue: string) => {
      console.log(newValue);
      if (newValue === '') {
        setOptions([]);
      } else {
        api(newValue).then((data) => {
          setOptions(data);
        });
      }
    },
    { wait: 300 },
  );
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

  const handleSelectSku = (select) => {
    console.log(select);
    const target = mockData.find((item) => select.includes(item.name));
    selectSku(target);
  };

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
        <Select
          className="sku-search-input"
          placeholder="请输入您要搜索的内容"
          showSearch
          style={{ maxWidth: '200px', minWidth: '200px' }}
          onSearch={handleSearch.run}
          onSelect={handleSelectSku}
          notFoundContent={null}
          popupMatchSelectWidth={false}
          options={options}
          // filterOption={(input, option) => option?.value.includes(input)}
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
            {`我的购物车（${skuList.length}）`}
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
