import passport from "passport"

export const passportCall = (strategy)=>{
    return (req, res, next) => {
        passport.authenticate(strategy, {session: false}, (error, user, info) => {
            if (error) return res.send({status: 'error', error})
            if (!user) return res.send({status: 'error', error: info.msg ? info.msg : info.toString() })
            req.user = user
            next()
        })(req,res,next)
    }
}