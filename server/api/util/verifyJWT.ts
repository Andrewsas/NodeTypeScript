import * as jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) { 
        return res.status(401).send('no.token.provided');
    } else { 
        jwt.verify(token, config.secret, function(err, decoded) {
    
        if (err) {
            return res.status(500).send('failed.authenticate.token');
        }
        
        next();
    });
  }
}