if(process.env.NODE_ENV === 'production'){
    module.exports = {
        emailAccount: process.env.EMAIL_ACCOUNT,
        emailPassword: process.env.EMAIL_PASSWORD,
        emailHost: process.env.EMAIL_HOST
    }
}else{
    module.exports = {
        emailAccount: 'youremail@yourdomain.com',
        emailPassword: 'your_email_pass',
        emailHost: 'your_host'
    }
}