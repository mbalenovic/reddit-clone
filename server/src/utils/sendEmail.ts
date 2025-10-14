import nodemailer from "nodemailer";

// Wrap in an async IIFE so we can use await.
export async function sendEmail(to: string, subject: string, html: string) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eugenia.heller@ethereal.email",
      pass: "kM8qDHSD8GUpUmvPVR",
    },
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to,
    subject,
    html,
  });

  console.log("Message sent:", info);
}
