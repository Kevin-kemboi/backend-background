
import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export const sqlConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PWD || 'Godsfirst01',
  database: process.env.DB_NAME || 'Assignment1',
  server: 'DESKTOP-AD6VR7H',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}