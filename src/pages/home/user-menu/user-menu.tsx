import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import './user-menu.less';

export const UserMenu = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '我的订单',
    },
    {
      key: '2',
      label: '地址管理',
      disabled: true,
    },
    {
      key: '3',
      label: '修改密码',
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: '退出登录',
    },
  ];
  return (
    <div className="user-menus-container" id="user-menus-container">
      <Dropdown
        getPopupContainer={() =>
          document.getElementById('user-menus-container')
        }
        className="user-menus"
        id="user-menus"
        menu={{ items }}
      >
        <div className="hover-area">
          徐昱
          <DownOutlined className="arrow-icon" />
        </div>
      </Dropdown>
    </div>
  );
};
