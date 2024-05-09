import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import './user-menu.less';

export const UserMenu = (props) => {
  const { logout } = props;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '我的订单',
    },
    {
      key: '2',
      label: '地址管理',
    },
    {
      key: '3',
      label: '修改密码',
    },
    {
      key: '4',
      label: '退出登录',
      onClick: () => {
        logout();
      },
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
