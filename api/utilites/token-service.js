const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const secretKey = "testing";

// Load users from JSON file
let users = [];

// Construct the absolute path to users.json
const usersFilePath = path.resolve(__dirname, 'users.json');

// Read and parse users.json
try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(data);
} catch (err) {
    console.error('Error reading users.json:', err);
}

exports.requestToken = function (req, res, next) {
    const { username, password } = req.body;

    // Find the user in the JSON data
    const user = users.find(u => u.username === username);
    
    // Check if user exists and password matches
    if (!user) {
        res.statusCode = 403;
        return res.json({ success: false, message: "Authentication Failed, User not Found...." });
    } else if (user.password !== password) {
        res.statusCode = 403;
        return res.json({ success: false, message: "Authentication Failed, Wrong Password...." });
    }

    // Generate a token if authentication is successful
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: 1440 });
    res.statusCode = 200;
    return res.json({
        success: true,
        message: "Authentication Success",
        token: token
    });
}

exports.validateToken = function (req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                res.statusCode = 403;
                return res.json({
                    success: false,
                    message: "Invalid Token Found"
                });
            } else {
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        });
    } else {
        res.statusCode = 403;
        return res.json({
            success: false,
            message: "No Token Found"
        });
    }
}
