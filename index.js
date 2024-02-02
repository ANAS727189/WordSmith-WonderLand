import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






const blogPosts = [];

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
})


app.get("/blogs", (req,res) => {
    res.render("blogs.ejs", { blogPosts: blogPosts });
});


app.get("/quotes", (req,res) => {
    res.render("quotes.ejs");
});


app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});


app.get("/about", (req,res) => {
    res.render("about.ejs");
});


app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const { title, content, author, photo, date } = req.body;

    if (title && content && author && date) {
        const newPost = {
            id: blogPosts.length + 1,
            title,
            content,
            author,
            photo,
            date,
        };

        blogPosts.push(newPost);

        res.redirect("/blogs");
    } else {
  
        res.render("create.ejs", { error: "Please fill in all fields" });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
