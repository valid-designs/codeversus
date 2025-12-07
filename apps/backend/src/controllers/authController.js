import authService from "../services/authServices.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = generateToken(user);
    res.json({
      success: true,
      data: { token, user: { id: user.id, username: user.username, email: user.email } },
    });
  } catch (err) {
    next(err);
  }
};
