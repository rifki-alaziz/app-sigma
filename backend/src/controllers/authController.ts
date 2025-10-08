import { Request, Response } from 'express';

// Dummy user database
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
];

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah' });
  }

  // Simulasi token sederhana (di production gunakan JWT!)
  const token = `Bearer mock-token-for-${user.username}`;

  res.json({
    token,
    user: {
      username: user.username,
      role: user.role
    }
  });
};
