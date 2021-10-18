const express = require("express");
const session = require("express-session");
const cors = require("cors");

const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({ secret: "SOME" }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const orderRoutes = require("./routes/order");

const db = require("./config/db");

db();

const fn = () => console.log("listening");

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoute);
app.get(
  "/google/callback",

  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello" + req.user);
});
app.get("/auth/failure", (req, res) => {
  res.send("FAILED");
});

//Logout
app.get("/logout", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 5000, fn);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
