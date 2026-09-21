import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Cross-domain cookie settings for production
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,          // Only sent over HTTPS
    sameSite: 'none',      // Allows cross-site cookie (needed for Vercel <-> Render)
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;