import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";

export const login = async (req, res) => {
  const { user, token, message, status } = await authServices.login(req.body);
  res.status(status).json({ user, message, token });
};

export const register = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    const userResponse = await authServices.register(req.body);
    return res
      .status(userResponse.status)
      .json({ token: userResponse.token, message: userResponse.message });
  }
  return res
    .status(404)
    .json({ token: null, message: "Password must be match" });
};

export const searchUser = async (req, res) => {
  const { username } = req.body;
  const [userResponse] = await userServices.getOne(username);
  if (userResponse.lenght > 0)
    return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ message: "User found" });
};

export const changePassword = async (req, res) => {
  const { username, id, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password must be match" });
  const { status, user, message } = await userServices.getOne(id, username);

  if (!user) return res.status(status).json({ message });
  const userChanged = await userServices.changePassword(user.id, password);
  return res.status(userChanged.status).json({ message: userChanged.message });
};

export const validateAdmin = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(400).json({ message: "No token provided" });
  const { status, isAdmin } = await authServices.validateAdmin(token);
  return res.status(status).send(isAdmin);
};
