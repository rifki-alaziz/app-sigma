import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token || token !== 'Bearer secret-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { id: 1, role: 'admin' }; // simulasi user
  next();
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
