const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Change to your desired port

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
   service: 'Gmail', // E.g., 'Gmail', 'Yahoo', etc.
   auth: {
       user: 'suryars042@gmail.com', // Your email address
       pass: 'surya@54321', // Your email password
   },
});

// Generate and send OTP via email
app.post('/send-otp', (req, res) => {
   const email = req.body.email;
   const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

   const mailOptions = {
       from: 'your-email@gmail.com',
       to: email,
       subject: 'One-Time Password (OTP) Verification',
       text: `Your OTP is: ${otp}`,
   };

   transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           console.error(error);
           res.status(500).json({ message: 'Error sending OTP email' });
       } else {
           console.log(`OTP sent to ${email}: ${otp}`);
           res.json({ message: 'OTP sent successfully' });
       }
   });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
