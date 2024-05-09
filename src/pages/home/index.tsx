import { FireFilled } from '@ant-design/icons';
import { Button, Flex, Layout, Modal, Spin } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo_new.png';
import {
  contentStyle,
  footerStyle,
  headerStyle,
  layoutStyle,
  limitItems,
  warningList,
} from './constant';
import { ContentMenu } from './content-menu/content-menu';
import { HomeContent } from './home-content/home-content';
import './index.less';
import { ShoppingCar } from './shopping-car/shopping-car';
import { UserMenu } from './user-menu/user-menu';

// import bg from '../assets/before_begining.jpg';
export default function HomePage(props) {
  const { logout } = props;
  const { Header, Footer, Sider, Content } = Layout;

  const [homeTipOpen, setHomeTipOpen] = useState(true);
  const [countdown, setCountdown] = useState(1);

  const [showShoppingCar, setShowShoppingCar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectSku, setSelectSku] = useState();

  const [skuList, setSkuList] = useState([]);

  const [showJiesuanPage, setShowJiesuanPage] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId); // 清除定时器
    }
  }, [countdown]);

  const updateCar = (list: []) => {
    setSkuList(list.slice());
  };

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
        onClick={() => {
          setHomeTipOpen(false);
          logout();
        }}
      >
        我不同意
      </Button>
    </Flex>
  );

  const handleSelectSku = (sku) => {
    setLoading(true);
    setTimeout(() => {
      setShowShoppingCar(false)
      setSelectSku(sku);
      setShowJiesuanPage(false)
      setLoading(false);
    }, 1000);
  };

  const handleGoHome = () => {
    setLoading(true);
    setTimeout(() => {
      setShowShoppingCar(false);
      setLoading(false);
    }, 1000);
  };

  const addCar = (item) => {
    const skuListCopy = skuList.slice();
    skuListCopy.push(item);
    setSkuList(skuListCopy);
  };

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
            <UserMenu logout={logout} />
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
          selectSku={handleSelectSku}
          skuList={skuList}
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
          <ShoppingCar
            goHome={handleGoHome}
            skuList={skuList}
            updateCar={updateCar}
            addCar={addCar}
            jiesuan={() => {
              setLoading(true);
              setTimeout(() => {
                setShowShoppingCar(false);
                setShowJiesuanPage(true);
                setLoading(false);
              }, 1000);
            }}
          />
        ) : showJiesuanPage ? (
          <div style={{ color: '#000', fontSize: '30px' }}>
            结算操作点支付即可
          </div>
        ) : selectSku ? (
          <HomeContent
            skuList={skuList}
            selectSku={selectSku}
            updateCar={updateCar}
            addCar={addCar}
          />
        ) : (
          'content'
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
