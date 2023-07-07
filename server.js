const express = require('express');
const server = express();

server.all('/',(req,res)=>{
  res.send('<h>Server Vroom Vroom</h>')
});


module.exports=()=>{
  server.listen(6969,()=>{
    console.log('yeeee')
  });
  return true;
}