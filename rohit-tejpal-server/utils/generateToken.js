import jwt from 'jsonwebtoken';

const generateToken = (res, userId, role = 'user') => {
  const payload = {
    userId,
    role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // MUST be true when sameSite is 'none'
    sameSite: 'none', // Allow cross-origin requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;
