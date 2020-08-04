exports.adminAuth = (req, res, next) => {
	if (req.session.isLoggedIn) {
		if (req.session.user.access) return next();
		else return res.send("ACCESS DENIED !!!!!! ADMIN ONLY AREA");
	}
};

exports.normalAuth = (req, res, next) => {
	if (req.session.isLoggedIn) return next();
	else return res.redirect("/");
};
