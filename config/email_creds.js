if(process.env.NODE_ENV === 'production'){
    module.exports = {
        emailAccount: process.env.EMAIL_ACCOUNT,
        emailPassword: process.env.EMAIL_PASSWORD
    }
}else{
    module.exports = {
        emailAccount: 'procoder2018@damirp.com',
        emailPassword: 'J4FDz@P0a4HO'
    }
}