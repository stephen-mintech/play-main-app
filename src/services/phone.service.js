import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const fetchArea = () => BaseService.fetch(`${API_URL}/area`);

const sendVCode = (params) => BaseService.fetch(`${API_URL}/vcode`, params);

const submitBind = (model) => BaseService.post(`${API_URL}/vcode`, model);


export default { fetchArea, sendVCode, submitBind };