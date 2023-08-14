import { Router, Request, Handler } from "express";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

const requireAuth: Handler = (req, res, next) => {
  if (req.session?.loggedIn) {
    return next();
  } else {
    res.send("Not permitted");
  }
};

router.get("/", (req, res, next) => {
  if (req.session?.loggedIn) {
    res.send(`
    <div>
    <div>You are logged in</div>
    <a href="/logout">Log out </a>
    </div>
    `);
  } else {
    res.send(`
    <div>
    <div>You are logged out</div>
    <a href="/login">Log in </a>
    </div>
    `);
  }
});

router.get("/login", (req, res, next) => {
  res.send(
    `<form method ="POST">
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
    `
  );
});

router.post("/login", (req: RequestWithBody, res, next) => {
  const { email, password } = req.body;
  if (email && password && email === "hi@hi.com" && password === "1234") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else res.send("Provide correct email");
});

router.get("/logout", (req, res, next) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req, res, next) => {
  res.send("Welcome to protected route, loggedIn user");
});

export default router;
