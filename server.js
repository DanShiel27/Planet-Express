const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')


let contacts = [["test", "test@email.com", "2023-12-12", "rapid", "yes", 0]];
let next_id = 1;
let sale_message = "";
let sale_bool = false;

app.use("/resources", express.static("resources"))

app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const auth = basicAuth({
    users: {'admin': 'password'},
    challenge: true,
    realm: 'Imb4T3st4pp',
    unauthorizedResponse: "access forbiden"
});


app.get("/", function(req, res) {
    res.render("mainpage.pug");
});

app.get("/main", function(req, res) {
    res.render("mainpage.pug");
});

app.get("/contact", function(req, res) {
    res.render("contactform.pug");
});

app.get("/testimonies", function(req, res) {
    res.render("testimonies.pug");
});

app.get("/admin/contactlog", auth, function(req, res) {
    res.render("contactlog.pug", {contacts: contacts});
});

app.get("/api/sale", function(req, res) {
    if (sale_bool){
        const jsonobj = {active: true, message: sale_message};
        res.json(jsonobj);
    }
    else{
        const jsonobj = {active: false};
        res.json(jsonobj);
    }
});




app.post("/contact", function(req, res) {
    try{
        let newlist = ["", "", "", "", "no", -1];
        if (req.body.name.length < 1 || req.body.name.length < 1){
            res.send(400).send("garbage data");
        }
        newlist[0] = req.body.name;
        newlist[1] = req.body.email;
        newlist[2] = req.body.date;
        newlist[3] = req.body.option;
        if (req.body.check){
            newlist[4] = req.body.check;
        }
        newlist[5] = next_id;

        next_id = next_id + 1;
        contacts.push(newlist);
        
        res.status(201);
        res.render("thanks.pug");
    }
    catch(err){
        res.sendStatus(400);
        res.send(err);
    }
});

app.post("/api/sale", auth, function(req, res){
    try {
        sale_message = req.body.message;
        sale_bool = true;
        res.status(201);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
})




app.delete("/api/contact", auth, function(req, res) {
    try{
        const raw = req.body.id;
        const id = parseInt(raw);
        let deleted = false;
        if (id < 0){
            res.sendStatus(400);
        }


        for (let i = 0; i < contacts.length; i++){
            if (contacts[i][5] == id){
                contacts.splice(i, 1);
                deleted = true;
            }
        }

        if(!deleted){
            res.status(404);
        }
        res.send("deleted");
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
});

app.delete("/api/sale", auth, function(req, res) {
    try{
        sale_bool = false;
        sale_message = "";
        res.status(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    } 
})

//taken from lecture on monday the 13th
app.use((req, res) => {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(4131, function() {
    console.log("server is running")
});