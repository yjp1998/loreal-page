import {
  CheckOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Flex } from 'antd';
import Big from 'big.js';
import classNames from 'classnames';
import { useState } from 'react';
import './shopping-car.less';

export const ShoppingCar = (props) => {
  const { goHome, skuList, updateCar, jiesuan } = props;

  const [selectSkus, setSelectSkus] = useState(skuList.map((item) => item.id));

  console.log(skuList);
  const nonePage = (
    <Flex className="none-page" vertical justify="center" align="center">
      <ShoppingCartOutlined className="icon" />
      <div className="title">
        <div className="tip-1">您的购物车还是空的</div>
        <div className="tip-2">快去选购吧</div>
      </div>
      <div className="go-home-page-btn" onClick={goHome}>
        去首页逛逛
      </div>
    </Flex>
  );
  const shoppingCarHeader = (
    <div className="shopping-car-header">{`我的购物车（${skuList.length}）`}</div>
  );

  const minus = (item, index) => {
    console.log('minus');
    const newItem = {
      ...item,
      add_quantity: item.add_quantity - 1,
    };
    const skuListCopy = Object.assign(skuList);
    skuListCopy.splice(index, 1, newItem);
    updateCar(skuListCopy);
  };

  const add = (item, index) => {
    console.log('item');
    const newItem = {
      ...item,
      add_quantity: item.add_quantity + 1,
    };
    console.log(newItem);
    const skuListCopy = Object.assign(skuList);
    skuListCopy.splice(index, 1, newItem);
    updateCar(skuListCopy);
  };

  const remove = (id, index) => {
    const skuListCopy = Object.assign(skuList);
    skuListCopy.splice(index, 1);
    updateCar(skuListCopy);
    if (selectSkus.includes(id)) {
      const selectSkusCopy = selectSkus.filter((item) => item !== id);
      setSelectSkus(selectSkusCopy);
    }
  };

  const checkboxClick = (curSkuId: string) => {
    console.log(selectSkus);
    if (selectSkus?.includes(curSkuId)) {
      const selectSkusCopy = selectSkus.slice().filter((id) => id !== curSkuId);

      setSelectSkus(selectSkusCopy);
    } else {
      const selectSkusCopy = selectSkus.slice();
      selectSkusCopy.push(curSkuId);
      setSelectSkus(selectSkusCopy);
    }
  };

  const allSelect = () => {
    if (selectSkus.length === skuList.length) {
      setSelectSkus([]);
    } else {
      setSelectSkus(skuList.map((item) => item.id));
    }
  };

  const totalAmount = () => {
    const filterList = skuList.filter((item) => selectSkus.includes(item.id));
    const amount = filterList.reduce((curPrice, curSku) => {
      return Big(curPrice)
        .add(Big(curSku.size.inner_price).times(curSku.add_quantity).toNumber())
        .toNumber()
        .toFixed(2);
    }, 0);
    return amount;
  };

  return (
    <div className="shopping-car-container" style={{ color: 'black' }}>
      <Flex justify="start">{shoppingCarHeader}</Flex>
      {skuList.length === 0 ? (
        nonePage
      ) : (
        <Flex vertical className="shopping-car-content">
          <Flex justify="space-evenly" className="sku-props-title">
            <div className="item name">商品</div>
            <div className="item">单价</div>
            <div className="item">数量</div>
            <div className="item">小计</div>
            <div className="item">操作</div>
          </Flex>
          <Flex vertical className="list-items">
            {skuList.map((sku, index) => {
              console.log(selectSkus?.includes(sku.id));
              return (
                <Flex className="sku-item" key={sku.id}>
                  <Flex className="left-part" align="center">
                    <div
                      className={classNames('checkbox', {
                        unchecked: !selectSkus?.includes(sku.id),
                      })}
                      onClick={() => checkboxClick(sku.id)}
                    >
                      <CheckOutlined />
                    </div>
                    <div className="img">照片</div>
                    <Flex
                      className="props"
                      vertical
                      justify="center"
                      align="start"
                    >
                      <div className="type-tag">美妆</div>
                      <div className="name">{sku.name}</div>
                      <div className="size">{sku.size.size}</div>
                    </Flex>
                  </Flex>
                  <Flex
                    className="other price"
                    vertical
                    justify="center"
                    align="center"
                  >
                    <div className="inner">{`¥${sku.size.inner_price}`}</div>
                    <div className="market">{`¥${sku.size.market_price}`}</div>
                  </Flex>
                  <Flex
                    className="other quantity"
                    vertical
                    justify="center"
                    align="center"
                  >
                    <Flex className="count-operation">
                      <div
                        className={classNames('quantity-btn', {
                          disabled: sku.add_quantity === 1,
                        })}
                        onClick={() => {
                          if (sku.add_quantity === 1) return;
                          minus(sku, index);
                        }}
                      >
                        -
                      </div>
                      <div className="quantity">{sku.add_quantity}</div>
                      <div
                        className={classNames('quantity-btn', {
                          disabled: sku.add_quantity === sku.size.quantity,
                        })}
                        onClick={() => {
                          if (sku.add_quantity === sku.size.quantity) return;
                          add(sku, index);
                        }}
                      >
                        +
                      </div>
                    </Flex>
                    <div className="stock">
                      {sku.size.quantity > 999
                        ? '库存999+'
                        : `库存仅剩${sku.size.quantity}`}
                    </div>
                  </Flex>
                  <div className="other total">
                    {`¥${Big(sku.size.inner_price)
                      .times(sku.add_quantity)
                      .toNumber()
                      .toFixed(2)}`}
                  </div>
                  <div className="other operation">
                    <DeleteOutlined onClick={() => remove(sku.id, index)} />
                  </div>
                </Flex>
              );
            })}
          </Flex>
          <Flex className="settle" justify="space-between" align="center">
            <Flex className="checkbox-wrapper" align="center">
              <div
                className={classNames('checkbox', {
                  unchecked: selectSkus.length !== skuList.length,
                })}
                onClick={allSelect}
              >
                <CheckOutlined />
              </div>
              <div className="all">全选</div>
            </Flex>

            <Flex className="right-part">
              <div className="amount">
                <div className="total">{`总计：¥${totalAmount()}`}</div>
                <div className="tip">不包含运费</div>
              </div>
              <div className="settle-btn" onClick={jiesuan}>
                去结算
              </div>
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  );
};
