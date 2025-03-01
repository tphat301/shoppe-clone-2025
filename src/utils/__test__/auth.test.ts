import { describe, expect, it } from 'vitest'
import {
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileToLS,
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  getProfileFromLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWY0NDVkZmIzNzMyMDQxNjFlZTMwNyIsImVtYWlsIjoidHlwZXNjb2RlOTgwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI1LTAzLTAxVDEwOjI1OjI4LjY1NloiLCJpYXQiOjE3NDA4MjQ3MjgsImV4cCI6MTc0MTQyOTUyOH0.EscrmHtXLJlo2RwwX7929zUcIsF7lcXTiBSclyT-g8k'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWY0NDVkZmIzNzMyMDQxNjFlZTMwNyIsImVtYWlsIjoidHlwZXNjb2RlOTgwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI1LTAzLTAxVDEwOjI1OjI4LjY1NloiLCJpYXQiOjE3NDA4MjQ3MjgsImV4cCI6MTc0OTQ2NDcyOH0.1F5q1fPnuMmzhAsOtompIBAmngHIBmCEtZ9fE2zgbgo'

const profile =
  '{"_id":"679f445dfb373204161ee307","roles":["User"],"email":"typescode9801@gmail.com","createdAt":"2025-02-02T10:09:33.982Z","updatedAt":"2025-02-27T13:18:33.820Z","__v":0,"date_of_birth":"1998-01-29T17:00:00.000Z","name":"Thành Phát","phone":"0987654322","address":"HCM","avatar":"bb08d11a-20f4-4688-8e62-39c3404b928e.jpg"}'

describe('setAccessTokenToLS', () => {
  it('setAccessTokenToLS được set vào trong localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('setRefreshTokenToLS được set vào trong localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('setProfileToLS', () => {
  it('setProfileToLS được set vào trong localStorage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toBe(profile)
  })
})

describe('getProfileFromLS', () => {
  it('Lấy profile', () => {
    setProfileToLS(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toBe(profile)
  })
})

describe('getAccessTokenFromLS', () => {
  it('Lấy access_token', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('getRefreshTokenFromLS', () => {
  it('Lấy refresh_token', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('clearLS', () => {
  it('Xóa access_token, refresh_token và profile', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
