import express from "express"
import nunjucks from "nunjucks"
import { marketingConfig } from "./config/marketing.js"
import { dashboardConfig } from "./config/dashboard.js"

const app = express()

app.use(express.static("public"))

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
const PORT = 3000

const setCache = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    next();
};

app.get("/", (req, res) => {
    res.render('index.html', { config: marketingConfig })
})

app.get("/login", (req, res) => {
    res.render('auth/login.html')
})

app.get("/register", (req, res) => {
    res.render('auth/register.html')
})

app.get("/dashboard", (req, res) => {
    res.set('HX-Redirect', '/dashboard')
    res.render('dashboard/index.html', { config: dashboardConfig, path: req.path })
})

app.get("/team", (req, res) => {
    res.render('dashboard/team/index.html', { path: 'team' })
})

app.get("/projects", (req, res) => {
    res.render('dashboard/projects/index.html')
})

app.get("/calendar", (req, res) => {
    res.render('dashboard/calendar/index.html')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))