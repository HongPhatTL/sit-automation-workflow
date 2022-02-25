import request from '@/utils/request';

//  =============== upload ===============
export async function uploadConfig(data) {
  console.log('upload data: ', data);
  return request(`/api/upload`, {
    method: 'POST',
    data,
  });
}
