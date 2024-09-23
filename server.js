import express from "express"
import nunjucks from "nunjucks"
import { marketingConfig } from "./config/marketing.js"
import { dashboardConfig } from "./config/dashboard.js"
import path from "path";
import { fileURLToPath } from "url";
import e from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, "public")))

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
    res.render('marketing/index.html', { config: marketingConfig })
})

app.get("/login", (req, res) => {
    res.render('auth/login.html')
})

app.get("/register", (req, res) => {
    res.render('auth/register.html')
})

app.get("/dashboard/sidebar", (req, res) => {
    res.render('components/sidebar.html', { config: dashboardConfig })
})


app.get("/dashboard", (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }

})


app.get("/dashboard/team", (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/team/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/projects", (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/projects/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/calendar", (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/calendar/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/documents", (req, res) => {
    const hxRequest = req.headers['hx-request']
    console.log(hxRequest)
    if (hxRequest) {
        res.render('dashboard/documents/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.get("/dashboard/reports", (req, res) => {
    const hxRequest = req.headers['hx-request']
    if (hxRequest) {
        res.render('dashboard/reports/index.html')
    } else {
        res.render('dashboard/layout.html', { config: dashboardConfig, path: req.path })
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))