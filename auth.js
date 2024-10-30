
const jwt = require("jsonwebtoken");
const secret = "InventoryManagement"

module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin 
	};

	return jwt.sign(data, secret, {});
}


module.exports.errorHandler = (err, req, res, next) => {

	console.error(err);
	const statusCode = err.status || 500;

	const errorMessage = err.message || 'Internal Server Error';
	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER ERROR',
			details: err.details || null 
		}
	})
}

