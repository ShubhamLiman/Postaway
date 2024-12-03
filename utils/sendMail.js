import nodemailer from 'nodemailer';

async function sendMail(email,otp){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'shubhamsendermail@gmail.com',
            pass:'tancrvgtziciqxkn'
        }
    });

    const mailOptions = {
        from: 'shubhamsendermail@gmail.com',
        to: email,
        subject: 'Reset password OTP',
        text: `Your OTP to reset password ${otp}`,
    };

    try{
        const result = await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully to " + email);
    }catch(err){
        console.log("Error sending mail: " + err);
    }

}

export default sendMail;