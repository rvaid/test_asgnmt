var express = require('express');
var router = express.Router();
const request = require("request");
const oorjan_url = 'https://www.oorjan.com/blog/wp-json/wp/v2/posts/'




router.get('/', function(req, res, next) {
    console.log(req.query)
    let options = {
        method: 'GET',
        url: oorjan_url,
        qs: {'search' : req.query.search,'per_page' : req.query.per_page}
        
    };
    request(options, function(err, response, body) {
        if (err) {next(err)}
        let blog_data = JSON.parse(body)
        let result = blog_data.map(function(obj){
                    let modified_obj = {}
                    modified_obj['title'] = obj['title']['rendered']
                    modified_obj['link'] = obj['link']
                    return modified_obj
                })
        res.send(result)        
    });
});

module.exports = router