module.exports.multiple = function (req, res) {
    const number1 = req.params.number1;
    const number2 = req.query.number2;
    const product = number1 * number2;
    res.status(200).send(`Multiplication of ${number1}x${number2} = ${product}`);
}

module.exports.default = function (req, res) {
    res.status(500).send('Please provide two numbers');
}