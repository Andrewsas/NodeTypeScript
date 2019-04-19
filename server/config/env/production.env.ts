module.exports = {
    env: 'production',
    db: process.env.DBURL || 'mongo',
    dbURL: process.env.DBURL || 'mongodb://localhost:27017/mongo',
    secret: process.env.SECRET ||'S3cr3t',
    servePort: process.env.PORT || 3000,
    origin: process.env.DOMAIN || '*',
    pathUpload: process.env.UPLOAD || './server/uploads/'
}