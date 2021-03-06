import React from "react";
import ModalWindow from '@app-universal/Common/ModalWindow/ModalWindows';
import {
  getGoodsItemFormData,
  resetGoodsItemFormData, loadGoods, saveGoodsFormData,
} from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  goodsItemFormDataSelector,
} from '@app-reducers/commonSelectors';
import { match } from 'react-router';
import GoodsItemForm from './forms/GoodsItemForm';
import { History } from 'history';

// указываем допустимые в нашем случае параметры
type filterParams = {
  goods_id?: string,
  // name?: string,
}
type GoodsEditPropsType = {
  history: History,
  match: match<filterParams>,
};

export default function GoodsEdit({ match }: GoodsEditPropsType) {

  const itemId = match.params.goods_id;
  const dispatch = useDispatch();

  const reloadGoods = React.useCallback(() => {
    dispatch(loadGoods);
  }, [dispatch]);

  React.useEffect(() => {
    if (itemId) {
      dispatch(getGoodsItemFormData(itemId));
    }
    return () => {
      dispatch(resetGoodsItemFormData);
    };
  },
    [dispatch, itemId]
  );

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    if (itemId) {
    dispatch(saveGoodsFormData(itemId));
  }
  },
    [dispatch, itemId] 
  );

  const formState = useSelector(goodsItemFormDataSelector);


  return (
    <ModalWindow
      backRoute='/goods'
    >
      <h2>Редактирование товара </h2>

      <GoodsItemForm
        formData={formState}
        itemId={itemId ? itemId : ''}
        afterSaveRoute='/goods'
        onSuccess={reloadGoods}
        onSubmit={onSubmit}
      />

    </ModalWindow>
  );
}