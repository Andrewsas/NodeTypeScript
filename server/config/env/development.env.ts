module.exports = {
    env: 'development',
    db: 'teste',
    dbURL: 'mongodb://localhost:27017/teste',
    secret: 'S3cr3t',
    servePort: 3000,
    origin: '*',
    pathUpload: './server/uploads/',
    email: {
        host: "smtp.mailtrap.io",
        email: "nao-responda@email.com",
        port: 2525,
        auth: {
            user: "d851e89e1d3c71",
            pass: "add1c68e02a610"
        }
    }
}