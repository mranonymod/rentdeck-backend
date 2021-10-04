const {sign} =require('jsonwebtoken')

const genTk = (id) => {
  return sign({ id }, process.env.JWT_KEY, {
    expiresIn: '1d',
  })
}
const genRfTk = (userId) => {
  return sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

const sndTk = (req, res, accesstoken, userInfo) => {
  res.status(200).json({
    success: true,
    accesstoken,
    data: {
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      cart: userInfo.cart,
      history: userInfo.history,
      contactDetails: userInfo.contactDetails,
    },
  });
  console.log("Token: Send Access Token Success".green);
};

const sndRfTk = (res, token) => {
  res.status(200).cookie("refreshtoken", token, {
    httpOnly: true,
    path: REFRESH_TOKEN_COOKIE_PATH,
  });
  console.log("Token: Send Refresh Token Success".green);
};

module.exports=genTk