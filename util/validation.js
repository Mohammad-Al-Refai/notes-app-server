function isNameValid(name) {
  var reg = /^[a-zA-Z-_]+$/
  return reg.test(name)
}

function isPINValid(pin) {
  var reg = /^[0-9]+$/
  return reg.test(pin)
}

module.exports = { isNameValid, isPINValid }
