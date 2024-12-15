const axios=require('axios');
const fs=require('fs/promises')
const url="https://jsonplaceholder.typicode.com/users"
axios.get(url).then(r=>r.data)
              .then(data=> fs.writeFile('./users.json',JSON.stringify(data,null,2)))