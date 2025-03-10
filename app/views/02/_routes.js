const { Console } = require('console');
const express = require('express')
const router = express.Router()
const http = require('http')
// Add your routes here - above the module.exports line


router.post('/subject-answer', function(request, response) {
    var subjects = request.session.data['subject'];
    
    if (subjects.includes("Agriculture, Horticulture and Animal Care") && subjects.includes("Health, Public Services and Care")) {
        response.redirect("browse-courses-extra-questions");
    } else if (subjects.includes("Health, Public Services and Care")) {
        response.redirect("browse-courses-health");
    } else if (subjects.includes("Agriculture, Horticulture and Animal Care")) {
        response.redirect("browse-courses-agriculture");
    } else {
        response.redirect("/search-results-browse");
    }
});


//code to run the localAPI
router.get('/runexternalhelloworldapi',function(request,response){
    var data=request.session.data
    Console.log('HELLO')
    Console.log(data)
    const options={
        hostname:'http://127.0.0.1/',
        port: '5000',
        path: 'helloworld',
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        data:data
    }
    const request2=http.request(options)
    Console.log(request2)
    response.redirect('/search-results-browse')
});

module.exports = router
