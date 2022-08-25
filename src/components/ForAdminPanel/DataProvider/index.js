import { fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

const API_URL = process.env.REACT_APP_SERVER_API_URL
export default (httpClient = fetchUtils.fetchJson) => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    }

    const url = `${API_URL}/api/${resource}?${stringify(query)}`
    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length,
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/api/${resource}`).then(({ json }) => ({
      data: json.find((item) => item.id === parseInt(params.id, 10)),
    })),

  update: (resource, params) =>
    httpClient(
      `${process.env.REACT_APP_SERVER_API_URL}/${resource}/${params.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(params.data),
      },
    ).then(({ json }) => ({ data: json })),

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${API_URL}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }))
  },
})
