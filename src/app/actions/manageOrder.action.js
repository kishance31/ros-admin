export const manageOrderMap = {
  UPDATE_MANAGE_ORDER_NEW_ORDER_CONFIRM:
    'UPDATE_MANAGE_ORDER_NEW_ORDER_CONFIRM',
  UPDATE_MANAGE_ORDER_NEW_ORDER_DISPATCH_DETAILS:
    'UPDATE_MANAGE_ORDER_NEW_ORDER_DISPATCH_DETAILS',
};

export const manageOrderAction = {
  updateManageOrderNewOrderConfirm: (
    orderId,
    newOrderId,
    orderConfirm,
    orderConfirmDate
  ) => {
    return {
      type: manageOrderMap.UPDATE_MANAGE_ORDER_NEW_ORDER_CONFIRM,
      payload: {
        orderId: orderId,
        newOrderId: newOrderId,
        orderConfirm: orderConfirm,
        orderConfirmDate: orderConfirmDate,
      },
    };
  },
  updateManageOrderNewOrderDispatchDetails: (
    orderId,
    newOrderId,
    dispatchStatus,
    dispatchDate,
    deliveryDate
  ) => {
    return {
      type: manageOrderMap.UPDATE_MANAGE_ORDER_NEW_ORDER_DISPATCH_DETAILS,
      payload: {
        orderId: orderId,
        newOrderId: newOrderId,
        dispatchStatus: dispatchStatus,
        dispatchDate: dispatchDate,
        deliveryDate: deliveryDate,
      },
    };
  },
};
