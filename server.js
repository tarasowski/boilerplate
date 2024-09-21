import express from "express"
import nunjucks from "nunjucks"
import { marketingConfig } from "./config/marketing.js"
import { dashboardConfig } from "./config/dashboard.js"
import path from "path";
import { fileURLToPath } from "url";

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
    res.render('index.html', { config: marketingConfig })
})

app.get("/login", (req, res) => {
    res.render('auth/login.html')
})

app.get("/register", (req, res) => {
    res.render('auth/register.html')
})

app.get("/dashboard", (req, res) => {
    //res.set('HX-Redirect', '/dashboard')
    res.render('dashboard/layout.html', { config: dashboardConfig })
})

app.get("/dashboard/main", (req, res) => {
    res.set('HX-Redirect', '/dashboard/main')
    const partial = req.query.partial === 'true'
    res.render('dashboard/main/index.html', { config: dashboardConfig, partial })
})

app.get("/dashboard/team", (req, res) => {
    const partial = req.query.partial === 'true'
    res.render('dashboard/team/index.html', { config: dashboardConfig, partial })
})

app.get("/dashboard/projects", (req, res) => {
    res.render('dashboard/projects/index.html')
})

app.get("/dashboard/calendar", (req, res) => {
    res.render('dashboard/calendar/index.html')
})

app.get("/dashboard/documents", (req, res) => {
    res.render('dashboard/documents/index.html')
})

app.get("/dashboard/reports", (req, res) => {
    res.render('dashboard/reports/index.html')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))