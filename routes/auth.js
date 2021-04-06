// const { checkToken } = require('./middlewares/check-token');
const { check, validationResult } =require('express-validator');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');

const { User } = require('../db');

/*****  POST Register end-point. *****/
router.post('/register',[
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail()
],async(req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() });
    }

    let newUser =  await User.findOne({ where:{ email } }); 
    
    if (!newUser) {
       
        req.body.password = bcrypt.hashSync(password, 10);
        newUser = await User.create(req.body);
        res.json({
            message : 'Usuario registrado correctamente',
            userToken : createToken(newUser)
        });
        
    }else{
        res.send('Este correo ya ha sido registrado');
    }
    
    
});


/*****  POST Login end-point. *****/
router.post('/login', async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where : { email } });

    if (user) {
        
        const iguales = bcrypt.compareSync(password, user.password);

        if ( iguales ) {
            res.json({ succes: createToken(user)})
        } else {
            res.json({ error : 'Error en correo y/o contraseña'});
        }
        
    } else {
        res.json({ error : 'EL usuario no ha sido registrado o hay un error en correo y/o contraseña'});
    }
    
});

const createToken = (user) => {
    const payload = {
        usuario_id : user.id,
        createdAt : moment().unix(),
        expiredAt : moment().add(5 , 'minutes').unix()
    }

    return jwt.encode(payload, 'FRASE_SECRETA');
}


module.exports = router;