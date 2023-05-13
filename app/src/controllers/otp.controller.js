import models from "../models/sequelize.js";
import { authenticator } from 'otplib';
import QRCode from "qrcode";

export const generate = async (req, res, next) => {
    try {
        const user = await models.User.findByPk(req.session.user);
        if (!user) {
            res.redirect('/');
        }

        const secret = authenticator.generateSecret();
        await user.update({
            secretOTP: secret
        })
        await user.save();

        const url = await QRCode.toDataURL(authenticator.keyuri(user.email, '2fa app', secret))

        req.session.qr = url;

        return res.redirect('/otp/verify');
    } catch (err) {
        console.log(err);
    }
}

export const showVerifyForm = (req, res, next) => {
    if (!req.session.qr) {
        return res.redirect('/');
    }

    return res.render('register-2fa.html', {
        qr: req.session.qr
    })
}

export const verify = async (req, res, next) => {
    const { code } = req.body;

    const user = await models.User.findByPk(req.session.user);
    if (!user) {
        return res.redirect('/');
    }

    if (!authenticator.check(code, user.secretOTP)) {
        return res.redirect('/');
    }

    user.hasOTP = true;
    await user.save();

    req.session.otp = user.hasOTP;
    delete req.session.qr;

    return res.redirect('/');
}

export const showValidateForm = (req, res, next) => {
    return res.render('login-otp.html');
}

export const validate = async (req, res, next) => {
    const { code, email } = req.body;
    const user = await models.User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        return res.redirect('/signin')
    }

    if (!authenticator.check(code, user.secretOTP)) {
        return res.redirect('/signin')
    }

    req.session.authenticated = true;
    req.session.user = user.id;
    req.session.otp = user.hasOTP;

    return res.redirect('/');

}
export const disable = async (req, res, next) => {
    try {
        const user = await models.User.findByPk(req.session.user);

        user.hasOTP = false;
        user.secretOTP = null;
        await user.save();

        req.session.otp = user.hasOTP;

        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}