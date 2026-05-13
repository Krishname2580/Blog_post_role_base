const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        },
        process.env.REFRESH_JWT_SECRET, { expiresIn: '7d' }
    );
};

module.exports = generateRefreshToken;