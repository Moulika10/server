"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
        return;
    }
    res.status(403);
    res.send('Not Permitted');
}
var router = (0, express_1.Router)();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n  <form method=\"POST\">\n    <div>\n        <label>Email</label>\n        <input name=\"email\"/>\n  </div>\n  <div>\n        <label>Password</label>\n        <input name=\"password\" type =\"password\"/>\n  </div>\n  <button>Submit</button>\n  </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'moulika' && password === '123') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send("Invalid email and password");
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("<div>\n<div> You are logged in</div>\n<a href= \"/logout\">Logout</href>\n</div>");
    }
    else {
        res.send("<div>\n  <div> You are not logged in</div>\n  <a href= \"/login\">Login</href>\n  </div>");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("Welcome to protected route");
});
