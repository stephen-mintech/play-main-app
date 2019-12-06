import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const fetchBankCodes = () => BaseService.fetch(`${API_URL}/bank`);

export default { fetchBankCodes };