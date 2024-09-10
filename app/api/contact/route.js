import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // Validate the input fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other email services as well
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail email address
                pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
            },
        });

        // Email options
        let mailOptions = {
            from: email, // Sender's email address (form submitter)
            to: 'official.atraf@gmail.com', // Receiver's email address (your email)
            subject: `New Contact Form Submission from ${name}`,
            text: `You have received a new message from the contact form on your website.\n\n
             Name: ${name}\n
             Email: ${email}\n
             Message: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        return NextResponse.json(
            { success: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}
