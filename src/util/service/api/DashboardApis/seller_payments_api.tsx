'use server'

import { Api } from '..'

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type SortField = 'createdAt' | 'amount' | 'status'
export type SortOrder = 'ASC' | 'DESC'

export interface SellerPayment {
  id: number
  userId: number
  bookingId: number
  amount: string
  description: string
  status: PaymentStatus
  paymentUrl: string
  transactionId: string | null
  createdAt: string | null
  updatedAt: string | null
  booking: {
    id: number
    houseId: number
    reservedDates: string[]
    traveler_details: {
      gender: string
      lastName: string
      birthDate: string
      firstName: string
      nationalId: string
    }[]
    status: string
    sharedEmail: string
    sharedMobile: string
    createdAt: string
    house: {
      id: number
      title: string
      sellerId: number
      sellerName: string
    }
  }
}

export interface SellerPaymentsResponse {
  payments: SellerPayment[]
  totalCount: number
}

export interface GetSellerPaymentsParams {
  page?: number
  limit?: number
  sort?: SortField
  order?: SortOrder
  status?: PaymentStatus
  type?: string
}

export async function getSellerPayments(params: GetSellerPaymentsParams = {}): Promise<SellerPaymentsResponse> {
  const { client } = await Api()
  const query = new URLSearchParams({
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
    sort: params.sort ?? 'createdAt',
    order: params.order ?? 'DESC',
    ...(params.status && { status: params.status }),
  })
  return client.get<SellerPaymentsResponse>(`/api/payments/seller-houses?${query}`)
}