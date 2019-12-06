import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const source =`${API_URL}/TestThirdLogin`;

const login = (credentials) => BaseService.post(source, credentials);


export default { login };