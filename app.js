const   express = require("express"),
        bodyParser = require("body-parser"),
        date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const items = [];
const workItems = [];

app.get("/", (req, res) => {
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", (req, res) => {
    res.render("about");
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});