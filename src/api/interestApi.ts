import { api } from './client';
import type { InterestRecord, InterestRequest } from '../types/interest';

export const submitInterest = async (payload: InterestRequest): Promise<InterestRecord> => {
  const response = await api.post('/api/interests', {
    itemId: payload.itemId,
  });

  const data = response.data?.data ?? response.data;

  return {
    _id: data?._id ?? data?.id ?? '',
    itemId: String(data?.itemId ?? payload.itemId),
    userId: String(data?.userId ?? 'CURRENT_USER_ID'),
    status: (data?.status ?? 'Pending') as InterestRecord['status'],
  };
};
