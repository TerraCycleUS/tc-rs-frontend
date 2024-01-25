export default function paginationSlice(data, pagination) {
  return data.slice(
    pagination.perPage * (pagination.page - 1),
    pagination.perPage * (pagination.page - 1) + pagination.perPage
  );
}
