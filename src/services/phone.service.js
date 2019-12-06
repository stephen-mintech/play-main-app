import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const fetchArea = () => BaseService.fetch(`${API_URL}/area`);

export default { fetchArea };