import jwt, { ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import local from 'passport-local'
import usersModel from '../models/users.model.js'
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
                const { first_name, last_name, age } = req.body
                        const alreadyExists = await usersModel.findOne({email: username})
                        if (alreadyExists) return done(null, false, {msg: 'email already registered'})
                        const data = {
                            first_name,
                            last_name,
                            age,
                            email: username,
                            password: hashPass(password)
                        }
                        const newUser = await usersModel.create(data)
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
                const user = await usersModel.findOne({email: username})
                if (!user || !validatePass(password, user)) return done(null, false, {msg: 'invalid credentials'})
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
}

export default initializePassport