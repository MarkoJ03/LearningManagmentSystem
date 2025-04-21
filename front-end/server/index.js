const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken');
var _ = require('lodash');

const tokenSecret = "secret!";

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
    if (req.method == "POST") {
        try {
            for (let u of router.db.get("users").value()) {
                if (req.body.username == u.username && req.body.password == u.password) {
                    return res.json({
                        "token": jwt.sign({
                            id: u.id,
                            username: u.username, roles: u.roles
                        }, tokenSecret, { expiresIn: '7200s' })
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    res.sendStatus(401);
})

server.use((req, res, next) => {
    if (req.path == "/login") {
        return next();
    } else {
        if (req.path in router.db.get("permissions").value()) {
            if (!req.headers.authorization) {
                return res.sendStatus(403);
            }
            try {
                let token = jwt.verify(req.headers.authorization, tokenSecret);
                if (_.difference(token["roles"], router.db.get("permissions").get(req.path).value()).length != token["roles"].length) {
                    return next();
                }
                return res.sendStatus(403);
            } catch (error) {
                return res.sendStatus(403);
            }
        }
    }
    next();
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running on port 3000')
})