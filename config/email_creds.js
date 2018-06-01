if(process.env.NODE_ENV === 'production'){
    module.exports = {
        emailAccount: process.env.EMAIL_ACCOUNT,
        emailPassword: process.env.EMAIL_PASSWORD,
        emailHost: process.env.EMAIL_HOST
    }
}else{
    module.exports = {
        emailAccount: 'procoder2018@damirp.com',
        emailPassword: 'J4FDz@P0a4HO',
        emailHost: 'damirp.com'
    }
}