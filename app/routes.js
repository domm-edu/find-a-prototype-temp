//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.use('/02', require('./views/02/_routes'));
router.use('/03', require('./views/03/_routes'));
router.use('/04', require('./views/04/_routes'));
//code to run the localAPI
router.get('/runexternalhelloworldapi',function(request,response){
    var data=request.session.data
    Console.log('HELLO')
    Console.log(data)
    const options={
        hostname:'http://127.0.0.1',
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
    redirect('/search-results-browse')
});

module.exports = router