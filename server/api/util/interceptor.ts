import { config } from '../../config/config';

export function interceptor(req, res, next) {
        
    res.setHeader('Access-Control-Allow-Origin', config.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');    

    next();
}