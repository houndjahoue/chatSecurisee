export const setupOtp2Email = ({
    username,
    otp,
  }: {
    username: string;
    otp: string;
  }) => `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h3>Salut ${username}</h3>
  
      <p>
        Pour ta sécurité, nous t'avons envoyé se code pour ton authentification.
        <br />
        Si vous n'en êtes pas l'auteur, veuillez ignorer ce mail.
      </p>
  
      <p><b>OTP : </b> <span>${otp}</span></p>
    </body>
  </html>
  `;
  