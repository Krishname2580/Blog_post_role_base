const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,{expiresIn: '30s'}
    );
};

module.exports = generateAccessToken;