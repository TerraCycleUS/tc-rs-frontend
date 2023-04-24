import { fetchUtils } from 'react-admin'
import { DEFAULT_LANGUAGE } from '../../../utils/const'
import formatForUpdate from '../DataMappers/Update/formatForUpdate'
import dataSort from '../DataSort/dataSort'
import paginationSlice from '../PaginationSlice/paginationSlice'
import formatForCreate from '../DataMappers/Create/formatForCreate'

const API_URL = process.env.REACT_APP_SERVER_API_URL
export default (
  httpClient = fetchUtils.fetchJson,
  language = DEFAULT_LANGUAGE,
  token = null,
) => ({
  getList: (resource, params) => {
    const { perPage, page } = params?.pagination || {}
    const { filter } = params
    const filterParams = new URLSearchParams(filter).toString()
    const paginationStructure = resource === 'user'
    const url =
      resource === 'user'
        ? `${API_URL}/api/admin/${resource}?${filterParams}&offset=${
            (page - 1) * perPage
          }&limit=${perPage}`
        : `${API_URL}/api/admin/${resource}?lang=${language}&${filterParams}&offset=${
            (page - 1) * perPage
          }&limit=${perPage}`
    return httpClient(url)
      .then(({ json }) =>
        paginationStructure
          ? {
              data: dataSort(json.items, params.sort),
              total: json.total || json.length,
            }
          : {
              data: paginationSlice(
                dataSort(json, params.sort),
                params.pagination,
              ),
              total: json.length,
            },
      )
      .catch((error) => Promise.reject(error))
  },

  getMany: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}?lang=${language}`)
      .then(({ json }) => ({
        data: json.filter((item) => params.ids.includes(item.id)),
      }))
      .catch((error) => Promise.reject(error)),

  getManyReference: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}?lang=${language}`)
      .then(({ json }) => {
        const filtered = json.filter((item) => params.ids.includes(item.id))
        return {
          data: filtered,
          total: filtered.length,
        }
      })
      .catch((error) => Promise.reject(error)),

  getOne: (resource, params) => {
    const isForUser = resource === 'user'
    const url = isForUser
      ? `${API_URL}/api/admin/${resource}?id=${params.id}`
      : `${API_URL}/api/admin/${resource}?lang=${language}`
    return httpClient(url)
      .then(({ json }) => ({
        data: isForUser
          ? json.items?.[0]
          : json.find((item) => item.id === parseInt(params.id, 10)),
      }))
      .catch((error) => Promise.reject(error))
  },

  update: async (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(
        await formatForUpdate(resource, params.data, language, token),
      ),
    })
      .then(({ json }) => ({ data: { ...json, id: parseInt(params.id, 10) } }))
      .catch((error) => Promise.reject(error)),

  create: async (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'POST',
      body: JSON.stringify(await formatForCreate(resource, params.data, token)),
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }))
      .catch((error) => Promise.reject(error)),

  delete: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: [params.id] }),
    })
      .then(() => ({ data: params.ids }))
      .catch((error) => Promise.reject(error)),

  deleteMany: (resource, params) =>
    httpClient(`${API_URL}/api/admin/${resource}`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: params.ids }),
    })
      .then(() => ({ data: params.ids }))
      .catch((error) => Promise.reject(error)),
})
