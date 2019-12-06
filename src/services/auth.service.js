import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const source =`${API_URL}/TestThirdLogin`;

const login = (credentials) => BaseService.post(`${source}/login`, credentials);

const refreshToken = (credentials) => BaseService.post(`${source}/RefreshToken`, credentials);

export default { refreshToken, login };