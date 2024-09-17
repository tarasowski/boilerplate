import express from "express"
import nunjucks from "nunjucks"
const app = express()

app.use(express.static("public"))

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
const PORT = 3000

app.get("/", (req, res) => {
    res.render('index.html')
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))