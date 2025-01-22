import jwt from 'jsonwebtoken'

export const generateToken = user => jwt.sign({user}, process.env.JWT_SECRET ,{expiresIn: '24h'})