import nodemailer from "nodemailer"

export const getEmailClient = async  ()=>{
    const account = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port: 587,
        auth:{
            user:account.user,
            pass:account.pass
        },
        secure:false,
    })

    return transporter
}