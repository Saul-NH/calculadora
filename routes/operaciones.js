const router = require('express').Router();

router.post('/suma', (req, res) => {

    const { numero1, numero2 } =  req.body;

    let suma = parseFloat(numero1) + parseFloat(numero2) ;
    return res.json({
        message : "La suma de " + numero1 + " + " + numero2 + " es: "+ suma,
        operador : "suma",
        numero1,
        numero2
    });

});

router.post('/resta', (req, res) => {
    
    const { numero1, numero2 } = req.body;
    const resta = parseFloat(numero1) - parseFloat(numero2);

    return 	res.json({
        message : "La resta de "+numero1 + " - " + numero2 + " es: "+ resta,
        operador : "resta",
        numero1,
        numero2
    })

});

router.post('/multiplicacion', (req, res) => {
    const { numero1, numero2 } = req.body;
    const producto = parseFloat(numero1) * parseFloat(numero2);

    return 	res.json({
        message : "La multiplicacion de " + numero1 + " * " + numero2 + " es: " + producto,
        operador : "multiplicacion",
        numero1,
        numero2
    });

});

router.post('/division', (req, res) => {
    const { dividendo, divisor } = req.body;
    const cociente = parseFloat(dividendo) / parseFloat(divisor);
    return 	res.json({
        message : "La division de " + dividendo + " ÷ " + divisor + " es: " + cociente,
        operdor : "division",
        dividendo,
        divisor
    });

});

module.exports = router;