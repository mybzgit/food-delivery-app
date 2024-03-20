import { DB_PATH } from '../constants'

const _fetch = (
  url: string,
  method: 'GET' | 'POST' | 'DELETE',
  body?: BodyInit,
) => {

  return fetch(url, {
    method,
    body,
  }).then(async (response) => {
    if (!response.ok) {
      const err = await response.json()
      throw new Error(`${err.errorText}`)
    }
    return response.json()
  })
}

export const fetchData = (
  url: string,
  token: string,
  params?: string,
) => {
  return _fetch(
    `${DB_PATH}/${url}?auth=${token}${params ?? ''}`,
    'GET',
  )
}

export const postData = (
  url: string,
  object: object,
  token: string,
) => {
  return _fetch(
    `${DB_PATH}/${url}?auth=${token}`,
    'POST',
    JSON.stringify(object),
  )
}
