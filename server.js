import express from "express"
import nunjucks from "nunjucks"
import { marketingConfig } from "./config/marketing.js"
import { dashboardConfig } from "./config/dashboard.js"
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport"
import { registerUser, authenticateUser } from "./auth.js"
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser());
app.use(passport.initialize());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
const PORT = 3000

const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('jwt-cookie', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect('/login');
        req.user = user;
        next();
    })(req, res, next);
};

app.get("/", (req, res) => {
    res.render('marketing/index.html', { config: marketingConfig })
})

app.get("/login", (req, res) => {
    res.render('auth/login.html')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    authenticateUser(email, password, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result) return res.status(401).json({ error: 'Invalid credentials' });
        res.cookie('jwt', result.token, { httpOnly: true, secure: true });
        res.redirect('/dashboard');
    });
});

app.get("/register", (req, res) => {
    res.render('auth/register.html')
})

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    registerUser(email, password, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.cookie('jwt', result.token, { httpOnly: true, secure: true });
        res.redirect('/dashboard');
    });
});

app.get("/dashboard/sidebar", (req, res) => {
    res.render('components/sidebar.html', { config: dashboardConfig })
})


app.get("/dashboard", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }

})


app.get("/dashboard/team", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/team/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/projects", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/projects/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/calendar", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/calendar/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/documents", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    console.log(hxRequest)
    if (hxRequest) {
        res.render('dashboard/documents/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/reports", ensureAuthenticated, (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/reports/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))