import jwt, { ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import local from 'passport-local'
import { usersService } from '../repositories/index.js'
import { hashPass, validatePass } from '../utils/password.js'
import google from 'passport-google-oauth'
import StrategyGithub from 'passport-github2'
import { config } from './config.js'

const JWTStrategy = jwt.Strategy
const LocalStrategy = local.Strategy
const GoogleStrategy = google.OAuth2Strategy

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
                if(!first_name || !last_name || !username || !password) return done(null, false, {message: 'Missing data'})

                const alreadyExists = await usersService.getUserByEmail(username)
                if (alreadyExists) return done(null, false, {message: 'email already registered'})
                const data = {
                    first_name,
                    last_name,
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

    passport.use('google', new GoogleStrategy({
        clientID: config.clientIDGoogle,
        clientSecret: config.clientSecretGoogle,
        callbackURL: 'http://localhost:8080/api/sessions/googleCallBack',
        scope: [ 'profile' ]
      },
      async (_,__, profile, done) =>{
        try {
            const user = await usersService.getUserByGoogleId(profile._json.sub)
            if (!user) {
                const newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    id_google: profile._json.sub
                }
                const data = await usersService.createUser(newUser)
                return done(null, data)
            } else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
      }))

      passport.use('github', new StrategyGithub(
        {
            clientID: config.clientIdGithub,
            clientSecret: config.clientSecretGithub,
            callbackURL: 'http://localhost:8080/api/sessions/githubCallBack'
        },
        async (_, __, profile, done) =>{
            try {
                const user = await usersService.getUserByGithubId(profile._json.id)
                if (!user) {
                    const newUser = {
                        first_name: profile._json.name || "",
                        id_github:profile._json.id
                    }
                    const data = await usersService.createUser(newUser)
                    done(null, data)
                } else {
                    done(null, user)
                }
            } catch (error) {
                done(error)
            }
        }
    ))
}

export default initializePassport