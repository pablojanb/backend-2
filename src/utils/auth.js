export const auth = (role)=> {
    return (req, res, next) => {
        if (req.user) {
            for (const userRole of req.user.roles) {
                if (userRole === role) return next()
            }
            return res.send({status: 'error', error: 'unauthorized'})
        } else {
            return res.send({status: 'error', error: 'unauthorized'})
        }
    }
}