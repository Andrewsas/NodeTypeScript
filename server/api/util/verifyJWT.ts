import * as jwt from 'jsonwebtoken';
import * as status from 'http-status';
import { config } from '../../config/config';

export function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) { 
        return res.status(status.UNAUTHORIZED).send('no.token.provided');
    } else { 
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    const data = jwt.decode(token);
                    const newToken = jwt.sign({ data: data.data }, config.secret, {expiresIn: config.expireToekn});
                    res.setHeader('token', newToken);
                } else {
                    return res.status(status.INTERNAL_SERVER_ERROR).send('failed.authenticate.token');
                }
            }    
            next();
        });
  }
}