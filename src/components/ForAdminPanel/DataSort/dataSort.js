export default function dataSort(data, sort) {
  return data.sort(
    sort.order === "ASC"
      ? (a, b) => ascendingOrder(a, b, sort.field)
      : (a, b) => descendingOrder(a, b, sort.field)
  );
}

function ascendingOrder(a, b, field) {
  if (!a[field]) return -1;
  if (!b[field]) return 1;
  if (typeof a[field] === "number") return a[field] - b[field];
  return a[field]
    ?.toString()
    ?.localeCompare(b[field], undefined, { numeric: true });
}

function descendingOrder(a, b, field) {
  if (!a[field]) return 1;
  if (!b[field]) return -1;
  if (typeof a[field] === "number") return b[field] - a[field];
  return b[field]
    ?.toString()
    ?.localeCompare(a[field], undefined, { numeric: true });
}
