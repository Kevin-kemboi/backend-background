import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Email configuration settings
const emailConfig = {
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
};

// Function to create a transporter
function initializeTransporter(config: any) {
  return nodemailer.createTransport(config);
}

// Function to send an email
export async function sendEmail(emailOptions: any) {
  const transporter = initializeTransporter(emailConfig);
  try {
    await transporter.verify();
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error verifying transporter:", error);
  }
}
