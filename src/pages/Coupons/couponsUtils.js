import { MONOPRIX_ID } from "../../utils/const";

const RETAILER_1_ID = MONOPRIX_ID;
const STATUS_READY_TO_UNLOCK_WEIGHT = 20000;
const STATUS_IN_PROGRESS = 10000;
const STATUS_EMPTY_WEIGHT = 0;
const RETAILER_1_WEIGHT = 1000;
const RETAILER_2_WEIGHT = 0;

// Calculate coupon weight by status, retailer and discount for sort
export function calculateCouponWeight(coupon) {
  let weight = 0;
  weight += calculateStatusWeight(coupon);
  weight += calculateRetailerWeight(coupon);
  weight += coupon.discount;
  return weight;
}

function calculateStatusWeight(coupon) {
  if (coupon.availableAmount === 0) {
    return STATUS_EMPTY_WEIGHT;
  }

  if (coupon.availableAmount < coupon.requiredAmount) {
    return STATUS_IN_PROGRESS;
  }

  return STATUS_READY_TO_UNLOCK_WEIGHT;
}

function calculateRetailerWeight(coupon) {
  return coupon.retailerId === RETAILER_1_ID
    ? RETAILER_1_WEIGHT
    : RETAILER_2_WEIGHT;
}

export function sortCouponsByWeight(coupons) {
  return coupons.sort((a, b) => b.weight - a.weight);
}
