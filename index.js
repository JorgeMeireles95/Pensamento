const express = require('express');
const exphs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const con = require('./db/conn');

const  app = express();




//Models
const Pensamento = require('./models/Pensamento');
const User = require('./models/User');

//Routes
const pensamentoRoutes = require('./routes/pensamentoRoutes.js');
const authRoutes = require('./routes/authRoutes.js');


//controller
const PensamentoController = require('./controllers/PensamentoController.js');


//template engine
app.engine('handlebars', exphs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//receber resposta do body
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//session
app.use(session({
    name: "session",
    secret:"nosso_secrete",
    resave:false,
    saveUninitialized:false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie:{
        secure:false,
        maxAge: 3600000,
        expires:new Date(Date.now() + 3600000),
        httpOnly:true
    }
}),
)


///flash messages
 //status do sistema, banco de dados.
app.use(flash());


//public path
app.use(express.static('public'));

//salva sessão na resposta  do servidor
app.use((req, res, next) => {
    console.log(req.session.userid);
   if(req.session.userid){
       res.locals.session = req.session;
   }
   next();
})

//Routes
app.use('/pensamentos', pensamentoRoutes);

//ficou assim para ter o /login e não o /auth/login
//app.use('/auth', authRoutes);
app.use('/', authRoutes);

app.get('/', PensamentoController.showPensamentos);




//conexão

//force = true; //apaga o banco de dados e cria um novo banco de dados
con.sync({force: false})
    .then(() => {
        app.listen(3000);
        app.get('/', (req, res) => {
            res.send('Hello World');
        })
        })
    .catch((err) => {
        console.log(err);
    });



