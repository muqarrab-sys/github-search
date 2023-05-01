import { AxiosResponse } from 'axios';

class ResponseTransformer {
  public ResponseToData<T = any, D = T>(data: AxiosResponse<T, D>) {
    return data.data;
  }
}

export default ResponseTransformer;
