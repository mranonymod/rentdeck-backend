const jwt =require('jsonwebtoken')

const genTk = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '3H',
  })
}

module.exports=genTk