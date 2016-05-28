module.exports = {
  random: _random 
}

function _random(req, res, next) {
  res.send('random');
}
