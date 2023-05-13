export const isAuthenticated = (req, res, next) => {
    if (!req.session.authenticated) {
        return res.redirect('/signin')
    }
    next();
}