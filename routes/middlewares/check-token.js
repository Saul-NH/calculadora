const moment = require('moment');
const jwt = require('jwt-simple');

const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.status(401).json({ error: 'Usuario no autenticado'})
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'FRASE_SECRETA');
        
    } catch (error) {
        return res.status(401).json({ error : 'Token incorrecto'})
    }

    if (payload.expiredAt < moment().unix()) {
        console.log(payload.createdAt+"/"+moment().unix());
        return res.json({ message : 'La session ha expirado'});
    }

    req.usuario_id = payload.usuario_id;

    next();
}

module.exports = {
    checkToken
}