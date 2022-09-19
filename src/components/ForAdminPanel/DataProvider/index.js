import { fetchUtils } from 'react-admin'
import { DEFAULT_LANGUAGE } from '../../../utils/const'
import formatForUpdate from '../DataMappers/Update/formatForUpdate'
import dataSort from '../DataSort/dataSort'
import paginationSlice from '../PaginationSlice/paginationSlice'

const API_URL = process.env.REACT_APP_SERVER_API_URL
export default (
  httpClient = fetchUtils.fetchJson,
  language = DEFAULT_LANGUAGE,
  token = null,
) => ({
  getList: (resource, params) => {
    const url = `${API_URL}/api/admin/${resource}?lang=${language}`
    return httpClient(url).then(({ json }) => ({
      data: paginationSlice(dataSort(json, params.sort), params.pagination),
      total: json.length,
    }))
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}?lang=${language}`).then(
      ({ json }) => ({
        data: json.find((item) => item.id === parseInt(params.id, 10)),
      }),
    ),

  update: async (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(
        await formatForUpdate(resource, params.data, language, token),
      ),
    }).then(({ json }) => ({ data: { ...json, id: parseInt(params.id, 10) } })),

  create: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: [params.id] }),
    }).then(() => ({ data: params.ids })),

  deleteMany: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: params.ids }),
    }).then(() => ({ data: params.ids })),
})
