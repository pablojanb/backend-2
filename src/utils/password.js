import bcrypt from 'bcrypt'

export const hashPass = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const validatePass = (password, user) => bcrypt.compareSync(password, user.password)