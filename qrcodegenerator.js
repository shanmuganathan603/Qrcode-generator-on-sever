const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const generateQR = async text => {
    try {
        const dataURL = await QRCode.toDataURL(text);
        return dataURL;
    } catch (err) {
        console.error(err);
        return '';
    }
}

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-image:url('https://wallpapers.com/images/featured-full/desktop-lsjkr6wg7ctq97qv.jpg')
                }
                h1 {
                    color: #333;
                }
                form {
                    margin: 20px;
                }
                input[type="text"] {
                    padding: 10px;
                    font-size: 16px;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
                img {
                    max-width: 300px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Generate QR Code</h1>
            <form method="post" action="/">
                <input type="text" name="username" placeholder="Your Name">
                <button type="submit">Generate QR Code</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/', async (req, res) => {
    const username = req.body.username;
    const qrDataURL = await generateQR(username);
    res.send(`
        <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                background-image: url('https://media.istockphoto.com/id/1157789866/photo/modern-computer-laptop-with-blank-screen-on-counter-barand-window-view.webp?b=1&s=170667a&w=0&k=20&c=KQvHmtg9VE7omt0okMYHQEKlBg9pneV_giSGY1KS3f0=');
                background-size: cover;
                background-position: center;
            }
            h1 {
                color: black;
            }
            form {
                margin: 20px;
            }
            input[type="text"] {
                padding: 10px;
                font-size: 16px;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                background-color: #007bff;
                color: #fff;
                border: none;
                cursor: pointer;
            }
            img {
                max-width: 300px;
                margin-top: 100px;
            }
            </style>
        </head>
        <body>
            <h1>This project is done by SHANMUGANATHAN</h1>
            <h1>Your requested QR code is generated successfully</h1>
            <h1>Thanks for visiting this page, have a nice day</h1>
            <img src="${qrDataURL}" alt="QR Code" width="300" height="300">
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
