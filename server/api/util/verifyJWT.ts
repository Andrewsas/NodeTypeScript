import * as jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
    console.log(`verifica token`)
    const token = req.headers['x-access-token'];
    if (!token) { 
        return res.status(401).send('no.token.provided');
    } else { 
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
    
        if (err)  
            return res.status(500).send('failed.authenticate.token');
        
        next();
    });
  }
}