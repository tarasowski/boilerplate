import express from "express"
import nunjucks from "nunjucks"
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
    res.render('index.html')
})

app.get("/login", (req, res) => {
    res.render('auth/login.html')
})

app.get("/register", (req, res) => {
    res.render('auth/register.html')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))