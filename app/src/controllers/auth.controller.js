import bcrypt from 'bcryptjs';
import models from '../models/sequelize.js';

export const showSignUpForm = (req, res, next) => {
    return res.render('register.html');
}
export const showSignInForm = (req, res, next) => {
    return res.render('login.html')
}
export const signUp = async (req, res, next) => {
    try {
        const { email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.redirect('/signup')
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await models.User.create({
            email,
            password: hashedPass
        })

        return res.redirect('/signin')
    } catch (err) {
        console.log(err);
    }
}
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await models.User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            return res.redirect('/signin')
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.redirect('/signin')
        }

        if (user.hasOTP) {
            return res.redirect('/otp/validate');
        }

        req.session.authenticated = true;
        req.session.user = user.id;
        req.session.otp = user.hasOTP;

        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

export const signOut = (req, res, next) => {
    req.session.destroy();
    return res.redirect('/sigin');
}