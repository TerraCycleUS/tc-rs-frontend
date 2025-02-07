export function changeCouponOrder(coupons) {
  const couponsCopy = [...coupons];
  let itemsCount = couponsCopy.length;

  sortCouponsByDiscount(couponsCopy);

  const couponGroupMap = groupCouponsByRetailer(couponsCopy);

  const couponGroupList = Object.entries(couponGroupMap);

  const sortedByCategoryInRetailer = couponGroupList.map(retailerObject => {
    return [retailerObject[0], sortByCategories(retailerObject[1])];
  });

  const result = [];
  let i = 0;
  while (itemsCount > 0) {
    // getting last item of current group
    const item = sortedByCategoryInRetailer[i][1].pop();

    // if group list is not empty, last item will be pushed to result array
    if (item) {
      result.push(item);
      itemsCount -= 1;
    }

    // getting index of next group or starting again from first group
    i = calculateNextArrayIndexWithOverflow(i, sortedByCategoryInRetailer.length);
  }

  return result;
}

function sortByCategories(couponGroupMap) {
  const uniqueCategories = [...new Set(couponGroupMap.map(item => item.categoryId))];

  const categoryMap = uniqueCategories.reduce((acc, categoryId) => {
    acc[categoryId] = couponGroupMap
      .filter(item => item.categoryId === categoryId)
      .sort((a, b) => b.discount - a.discount);
    return acc;
  }, {});

  const result = [];

  const sortedCategories = uniqueCategories.sort((a, b) => {
    const maxDiscountA = Math.max(...categoryMap[a].map(item => item.discount));
    const maxDiscountB = Math.max(...categoryMap[b].map(item => item.discount));
    return maxDiscountB - maxDiscountA;
  });

  const categoryIndex = uniqueCategories.map(() => 0);

  while (result.length < couponGroupMap.length) {
    for (let i = 0; i < sortedCategories.length; i++) {
      const currentCategory = sortedCategories[i];

      if (categoryIndex[i] < categoryMap[currentCategory].length) {
        result.push(categoryMap[currentCategory][categoryIndex[i]]);
        categoryIndex[i]++;
      }
    }
  }

  return result.reverse();
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
