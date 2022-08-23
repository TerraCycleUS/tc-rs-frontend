import { fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

export default (httpClient = fetchUtils.fetchJson) => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    }

    const url = `${
      process.env.REACT_APP_SERVER_API_URL
    }/api/${resource}?${stringify(query)}`
    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length,
    }))
  },
})
