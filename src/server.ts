import express from 'express'
import cron from 'node-cron'
import { run } from './Emailservice'

const app= express()

cron.schedule('*/5 * * * * *', async() => {
   await run()
  })

app.listen(4001, ()=>{
    console.log("server is running....")
})