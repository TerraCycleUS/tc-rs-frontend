import { fetchUtils } from 'react-admin'
import formatForUpdate from '../DataMappers/Update/formatForUpdate'

const API_URL = process.env.REACT_APP_SERVER_API_URL
export default (httpClient = fetchUtils.fetchJson) => ({
  getList: (resource) => {
    const url = `${API_URL}/api/admin/${resource}`
    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length,
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`).then(({ json }) => ({
      data: json.find((item) => item.id === parseInt(params.id, 10)),
    })),

  update: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(formatForUpdate(resource, params.data)),
    }).then(({ json }) => ({ data: json })),

  create: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) =>
    httpClient(`${API_URL}/api/admin/user`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: params.ids }),
    }).then(() => ({ data: params.ids })),
})
