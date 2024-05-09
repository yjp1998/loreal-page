import { Flex, Input, Modal } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Slider from '../slider';
import './index.less';

export const LoginInput = (props) => {
  const { loginHome } = props;
  const { Password } = Input;
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [countdown, setCountdown] = useState(1);
  const [tipOpen, setTipOpen] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId); // 清除定时器
    }
  }, [countdown]);
  return (
    <>
      <Flex className="container" justify="center" align="center" vertical>
        <h4 className="login-title">欧莱雅员工内卖</h4>
        <Input placeholder="请输入内卖账号" className="input-test" />
        <Password placeholder="请输入密码" className="input-test" />
        <button
          disabled={loginDisabled}
          className={classNames('login-btn', {
            'login-btn-able': !loginDisabled,
            'login-btn-disabled': loginDisabled,
          })}
          onClick={loginHome}
        >
          立即登录
        </button>
      </Flex>
      <Modal
        open={tipOpen}
        title={<div className="modal-title">友情提醒</div>}
        centered
        okButtonProps={{
          className: classNames('confirm-btn', {
            'confirm-btn-disabled': countdown > 0,
            'confirm-btn-able ': countdown === 0,
          }),
          disabled: countdown > 0,
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText={countdown > 0 ? `确认（${countdown}s）` : '确认'}
        onOk={() => setTipOpen(false)}
        closeIcon={null}
      >
        <div style={{ fontWeight: 500 }}>
          <p style={{ color: 'red', marginTop: '40px' }}>
            同一账号在同一时间点只能由一个用户登入，重复登入会导致先前访问自动退出。
          </p>
          <p>
            员工内卖账号仅限欧莱雅员工使用，不得转让，请妥善保管您的账号密码。内卖所购产品不得转售或者以其他形式牟利。
          </p>
        </div>
      </Modal>
    </>
  );
};
