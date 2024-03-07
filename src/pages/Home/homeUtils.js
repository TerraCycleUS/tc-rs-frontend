export function changeCouponOrder(coupons) {
  const couponsCopy = [...coupons];

  let itemsCount = couponsCopy.length;

  // sorting coupons by price in ascending order
  // in ascending order because coupons are later popped from end of array
  sortCouponsByDiscount(couponsCopy);

  // object of type {[retailerID]: [Coupons]}
  const couponGroupMap = groupCouponsByRetailer(couponsCopy);

  // array of coupon groups of type [[retailerID, [Coupons]]]
  const couponGroupList = Object.entries(couponGroupMap);

  // coupon groups sorting by their id in ascending order
  couponGroupList.sort(([id1], [id2]) => parseInt(id1) - parseInt(id2));

  const result = [];
  let i = 0;
  while (itemsCount > 0) {
    // getting last item of current group
    const item = couponGroupList[i][1].pop();

    // if group list is not empty, last item will be pushed to result array
    if (item) {
      result.push(item);
      itemsCount -= 1;
    }

    // getting index of next group or starting again from first group
    i = calculateNextArrayIndexWithOverflow(i, couponGroupList.length);
  }

  return result;
}

function sortCouponsByDiscount(coupons) {
  coupons.sort((a, b) => a.discount - b.discount);
}

function groupCouponsByRetailer(coupons) {
  const couponGroupMap = {};

  coupons.forEach((item) => {
    if (!couponGroupMap[item.retailerId]) {
      couponGroupMap[item.retailerId] = [];
    }

    couponGroupMap[item.retailerId].push(item);
  });

  return couponGroupMap;
}

function calculateNextArrayIndexWithOverflow(index, length) {
  return (index + 1) % length;
}
