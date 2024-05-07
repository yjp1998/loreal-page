import { FireFilled } from '@ant-design/icons';
import { Button, Flex, Layout, Modal, Spin } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo_new.png';
import { ContentMenu } from './content-menu/content-menu';
import { HomeContent } from './home-content/home-content';
import './index.less';
import { ShoppingCar } from './shopping-car/shopping-car';
import { UserMenu } from './user-menu/user-menu';

// import bg from '../assets/before_begining.jpg';
export default function HomePage() {
  const { Header, Footer, Sider, Content } = Layout;

  const [homeTipOpen, setHomeTipOpen] = useState(true);
  const [countdown, setCountdown] = useState(10);

  const [showShoppingCar, setShowShoppingCar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId); // 清除定时器
    }
  }, [countdown]);

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 100,
    paddingInline: 48,
    lineHeight: '100px',
    backgroundColor: '#fff',
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    // height: 'calc(100% - 100px - 234px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
    // backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 0',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  };

  const layoutStyle = {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    maxWidth: '100%',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#fff',
    height: 194,
    paddingTop: 40,
    borderTop: '1px solid #ececec',
  };

  const warningList = [
    '• 欧莱雅员工内卖仅限于欧莱雅员工，员工须保存好个人账号由本人使用，不得转让。',
    '• 员工所购产品，仅限自用，不得转售或者以其他形式牟利，否则将追究责任，后果自负。',
    '• 同一账号在同一时间点只能由一个用户登入，重复同时登入会导致先前访问自动退出。',
    '• 大众化妆品部单个产品订货数量不超过 10 个；高端化妆品部、皮肤科学美容事业部、专业美发部、欧莱雅国际分销部单个产品订货数量不超过 5 个。',
    '• 本着可持续发展的精神，本次员工内卖的部分产品为电商退货产品，在购买详情页里会有相关提醒字样。所有电商退货产品经公司大仓分拣检查后上架，原则上符合二次销售标准，但不排除个例。',
    '• 本次内卖电商退货产品均贴有“电商退货”“Ecom Return”字样的标签，如因个例发现质量问题申请退换货，需保留此标签，否则不予退换。',
    '• 每位员工购买高端化妆品牌总金额不超过10,000元。',
    '• 每位员工购买所有品牌产品总金额不超过15,000元。',
    '• 每张订单最小金额不低于300元。',
    '• 订单数量每人最多不超过10单。',
    '• 所有订单只接受网上付款（微信或支付宝），需在提交订单后两小时内完成付款。',
    '• 订单付款后不能更换产品或取消订单，最终订单以实际确认付款后为准。',
    '• 所有产品以实际发货为准。产品图片及有效期仅供参考。',
    '• 本次内卖仅提供快递寄送服务，可自由设定收货地址并选择相应快递公司，快递费用按产品（正装+赠品）重量和运输路程计算， 由员工本人负责支付。',
    '• 请务必于接收产品时检查产品质量，并于签收后48小时内联系客服，除产品质量问题（漏液、破损等）和保留了“电商退货” 字样标签的，其他不接受退货或者换货。',
    '• 本次内卖有精美礼品赠送，参见网站活动公告信息，所有赠品数量有限，先到先得，送完即止。',
    '• 客服电话: 400 128 8832（周一~周日09:00-21:00）',
    '• 客服邮箱 loreal@sfmail.sf-express.com',
  ];

  const modalFooterBtns = (
    <Flex vertical align="center" className="mt-[40px]">
      <Button
        disabled={countdown > 0}
        className={classNames('footer-btn', {
          'agree-btn-able': countdown === 0,
          'agree-btn-disabled': countdown > 0,
        })}
        onClick={() => setHomeTipOpen(false)}
      >
        {countdown > 0 ? `我同意（${countdown}s）` : '我同意'}
      </Button>
      <Button
        className="footer-btn cancel-btn"
        onClick={() => setHomeTipOpen(false)}
      >
        我不同意
      </Button>
    </Flex>
  );

  const limitItems = [
    {
      title: '总额度剩余',
      amout: '¥1992.75',
    },
    {
      title: 'LD额度剩余',
      amout: '¥538.75',
    },
    {
      title: '订单数',
      amout: '10/10',
    },
  ];
  return (
    <Layout style={layoutStyle}>
      <Flex
        className="limit bg-[#fff7ea]  h-[42px]"
        align="center"
        justify="center"
      >
        {limitItems.map((item) => {
          return (
            <div className="w-[200px]">{`${item.title}：${item.amout}`}</div>
          );
        })}
      </Flex>
      <Header style={headerStyle}>
        <Flex justify="space-between" className="w-[100%] h-[100%]">
          <Flex
            justify="flex-start"
            align="center"
            className="cursor-pointer"
            // className="h-[100%]"
            id="home-header"
          >
            <h1>
              <img src={logo} alt="" className="w-[96px]" />
            </h1>
            <UserMenu />
          </Flex>
          <Flex
            align="center"
            justify="end"
            className="text-[#000] cursor-pointer"
          >
            <div className="p-[25px] text-[#c3ac83]">
              <FireFilled className="mr-[10px]" />
              热卖活动
            </div>
            <div className="p-[25px]">帮助中心</div>
            <div className="p-[25px]">简体中文 ｜ English</div>
          </Flex>
        </Flex>
      </Header>
      <Content style={contentStyle}>
        <ContentMenu
          enterShoppingCar={() => {
            setLoading(true);
            setTimeout(() => {
              setShowShoppingCar(true);
              setLoading(false);
            }, 1000);
          }}
        />
        {loading ? (
          <Spin
            style={{
              width: '960px',
              height: 'inherit',
              margin: '0 auto',
              padding: '60px 0,',
            }}
            size="large"
          />
        ) : showShoppingCar ? (
          <ShoppingCar />
        ) : (
          <HomeContent />
        )}
      </Content>
      <Footer style={footerStyle}></Footer>

      <Modal
        className="home-tip-modal"
        style={{ height: '80vh' }}
        open={homeTipOpen}
        title={<div className="modal-title">购买规则</div>}
        centered
        okButtonProps={{
          className: classNames('confirm-btn', {
            'confirm-btn-disabled': countdown > 0,
            'confirm-btn-able ': countdown === 0,
          }),
          disabled: countdown > 0,
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={() => setHomeTipOpen(false)}
        closeIcon={null}
        footer={modalFooterBtns}
      >
        <div className="home-modal-content">
          <p style={{ marginTop: '40px' }}>欧莱雅员工2024/03员工内卖须知</p>
          <br />
          <br />
          <ul className="content-tips">
            {warningList.map((tip) => (
              <li>{tip}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </Layout>
  );
}
