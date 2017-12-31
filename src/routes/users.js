import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user
    .save()
    .then(userRecord => res.json({ user: userRecord.toAuthJson() }))
    .catch(error =>
      res.status(400).json({ errors: parseErrors(error.errors) })
    );
});

export default router;
