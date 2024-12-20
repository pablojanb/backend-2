import jwt from 'jsonwebtoken'

export const genereteToken = user => jwt.sign({user}, process.env.JWT_SECRET ,{expiresIn: '24h'})