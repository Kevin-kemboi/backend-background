import mssql from 'mssql';
import ejs from 'ejs';
import { sqlConfig } from '../config';
import path from 'path';
import dotenv from 'dotenv';
import { sendEmail } from '../helpers';
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface User {
  Id: string;
  email: string;
  username: string;
  password: string;
  isDeleted: number;
  isEmailSent: number;
}

export async function run() {
  try {
    let pool = await mssql.connect(sqlConfig);
    let users = (await pool.request().query("SELECT * FROM users WHERE isEmailSent = 0")).recordset as User[];

    const emailPromises = users.map(async (user) => {
      try {
        const templatePath = path.resolve(__dirname, "../../template/register.ejs");
        const data = await ejs.renderFile(templatePath, { name: user.username });
        
        const messageOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Welcome Aboard",
          html: data
        };

        await sendEmail(messageOptions);

        await pool.request()
          .input('Id', mssql.VarChar, user.Id)
          .query('UPDATE users SET isEmailSent = 1 WHERE Id = @Id');
      } catch (error) {
        console.error(`Error sending email to user ${user.email}:`, error);
      }
    });

    await Promise.all(emailPromises);
    console.log('Emails sent and database updated successfully.');
  } catch (error) {
    console.error('Error in run function:', error);
  }
}

run().catch(console.error);
