import jwt, { ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import local from 'passport-local'
import { usersService } from '../repositories/index.js'
import { hashPass, validatePass } from '../utils/password.js'

const JWTStrategy = jwt.Strategy
const LocalStrategy = local.Strategy

const initializePassport = ()=>{

    const extractToken = (req)=> {
        return req && req.cookies ? req.cookies['userlogged'] : null
    }
    
    passport.use('jwt', (new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([extractToken]),
            secretOrKey: process.env.JWT_SECRET
        },
        (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    )))

    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField: 'email'},
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, age, roles } = req.body
                if(!first_name || !last_name || !age || !username || !password) return done(null, false, {message: 'Missing data'})

                const alreadyExists = await usersService.getUserByEmail(username)
                if (alreadyExists) return done(null, false, {message: 'email already registered'})
                const data = {
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: hashPass(password),
                    roles
                }
                const newUser = await usersService.createUser(data)
                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async ( username, password, done) => {
            try {
                if(!username || !password) return done(null, false, {message: 'Missing data'})
                const user = await usersService.getUserByEmail(username)
                if (!user || !validatePass(password, user)) return done(null, false, {message: 'invalid credentials'})
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
}

export default initializePassport