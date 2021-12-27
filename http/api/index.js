const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

const data = require('./urls.json');


function writeFile(cwb){

    fs.writeFile(
        path.join(__dirname, 'urls.json'), 
        JSON.stringify(data, null, 2),
        
        err => {
            if (err) throw err
    
            cwb(JSON.stringify({message: 'ok'}));
        }
    )

};

http.createServer((req, res) => { 
    const { name, url, del } = URL.parse(req.url, true).query;

    // todos os recuros
    if(!name || !url)
        
        return res.end(JSON.stringify(data)); //http://localhost:3000/?
        
    if(del){ 
        
        data.urls = data.urls.filter(item => String(item.url) !== String(url));
        return writeFile((message) => res.end(message));
        
    };
    
    data.urls.push({name, url})

    return  writeFile((message) => res.end(message));

}).listen(3000, () => console.log('API is Running')); 

//http://localhost:3000/?name=Goole&url=http://google.com&create=1