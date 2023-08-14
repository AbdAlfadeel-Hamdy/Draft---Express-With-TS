"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const requireAuth = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        return next();
    }
    else {
        res.send("Not permitted");
    }
};
router.get("/", (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send(`
    <div>
    <div>You are logged in</div>
    <a href="/logout">Log out </a>
    </div>
    `);
    }
    else {
        res.send(`
    <div>
    <div>You are logged out</div>
    <a href="/login">Log in </a>
    </div>
    `);
    }
});
router.get("/login", (req, res, next) => {
    res.send(`<form method ="POST">
    <div>
    <label>Email</label>
    <input name="email"/>
    </div>
    <div>
    <label>Password</label>
    <input name="password" type="password"/>
    </div>
    <button>Submit</button>
    </form>
    `);
});
router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (email && password && email === "hi@hi.com" && password === "1234") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else
        res.send("Provide correct email");
});
router.get("/logout", (req, res, next) => {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, (req, res, next) => {
    res.send("Welcome to protected route, loggedIn user");
});
exports.default = router;
