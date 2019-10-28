import BaseService from '@/common/baseService';
import { SITE_URL } from '@/config';

const source =`${SITE_URL}/api/auth`;

const refreshToken = (credentials) => BaseService.post(`${source}/RefreshToken`, credentials);

export default { refreshToken };