//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const dom=require('express-dom');
// Add your routes here
router.use('/02', require('./views/02/_routes'));
router.use('/03', require('./views/03/_routes'));
router.use('/04', require('./views/04/_routes'));
router.use('/05', require('./views/05/_routes'));


router.get('/pingServer',async(req,res) =>{
    // function to ping the hello world message
    try { 
        const url='http://127.0.0.1:5000/helloworld';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                ,'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
                ,'Accept':'application/json'
                ,'Access-Control-Allow-Headers': ['origin','content-type','accept']
                ,body:req.body
            }
        }).then(
            response=>{
                if (!response.ok) {
                    console.error('NETWORK ERROR');
                    throw new Error('Network response was not ok');
                }
                console.log("RETURN");
                return response.json();
            }
        ).then(
            data=>{
                console.log('GETTING DATA');
                console.log(data['message']);
                res.sendJson({'message':'Hello there from the server'})
            }
        )
    }
    catch{
        console.log("CODE ERROR");
    };
});

router.post('/runVectorSearch_samepage',async(req,res) =>{
    // function to ping the hello world message
    try { 
        inputdata=req.body;
        console.log(req.body);

        let userinput="Cells and animals";
        let userlocation='Coventry';
        let cutoff_param='L25';
        //let jsonData={};
        //jsonData['userinput']=userinput;
        //jsonData['location']=userlocation;
        //jsonData['cutoff_param']=cutoff_param;
        console.log("Get JSON");
        const url='http://127.0.0.1:5000/runvectorsearch';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                ,'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
                ,'Accept':'application/json'
                ,'Access-Control-Allow-Headers': ['origin','content-type','accept']
            },
            body:JSON.stringify(req.body)
        }).then(
            response=>{
                if (!response.ok) {
                    console.error('NETWORK ERROR');
                    throw new Error('Network response was not ok');
                }
                console.log("RETURN");
                return response.json();
            }
        ).then(
            data=>{
                console.log('GETTING DATA');
                console.log(data['PAYLOAD']);
                return res.json(data);
            }
        )
    }
    catch{
        console.log("CODE ERROR");
    };
});

function CreateTableHTML(API_OUTPUT_OBJECT={}){
  console.log("Hello, now building table");  
  const data_obj=API_OUTPUT_OBJECT['PAYLOAD'];
  let keys_to_present=[
        //'COURSE_NAME',
        'ENTRY_REQUIREMENTS',
        'COURSE_TYPE',
        'DELIVERY_MODE',
        'LEVEL',
        'DISTANCE',
        'LOCATION_TOWN',
        'EMPLOYER_NAME',
        'PROVIDER_NAME',
        'START_DATE',
        'WHO_THIS_COURSE_IS_FOR'
        ,'DURATION'
        ,'score'    
  ];
  if(data_obj.length>0){
    big_html=`<br>`;
    html_spacing=`<br>`;
    for(let itr=0; itr<data_obj.length;itr++){
        tablehtml=`<table>`;
        tablehtml+=`<tr> <th>`+data_obj[itr]['COURSE_NAME']+`</th> <th><a href="`+data_obj[itr]['WEBSITE']+`">Link to course </a></th></tr></thead>`;
        for (let idx =0;idx<keys_to_present.length;idx++){
            let key=keys_to_present[idx];
            tablehtml+=`<tr><td>${key}</td><td>${data_obj[itr][key]}</td></td>`;            

        };
        tablehtml+=`</table>`
        big_html+=tablehtml+html_spacing

    }
    console.log(big_html);
    return big_html.replace("\n","");
  }
  return "No results";
};

router.get('/LoadVectorSearch_NewPage',async(req,res) => {
    // code to run the search from a landing page
    console.log("LOAD NEW PAGE");
    let template="./app//views/05/search-results-all-fromNodeJS_template.html";
    
    //let userinput="Cells and animals";
    //let userlocation='Coventry';
    //let cutoff_param='L25';
    
    //jsonData={
    //    'userinput':userinput,
    //    'location':userlocation,
    //    'cutoff_param':cutoff_param
    //};

    

    try { 
        inputdata=req.body;
        console.log("REQUEST");
        //console.log(req);
        
        console.log(`USER QUERY: ${decodeURIComponent(req.query.userinput)}`);
        console.log(`USER LOCATION: ${decodeURIComponent(req.query.location)}`);
        console.log(req.body);

        let userinput=decodeURIComponent(req.query.userinput);
        let userlocation=decodeURIComponent(req.query.location);
        let cutoff_param='L25';

        let jsonData={};
        jsonData['userinput']=userinput;
        jsonData['location']=userlocation;
        jsonData['cutoff_param']=cutoff_param;
        console.log("Get JSON");
        const url='http://127.0.0.1:5000/runvectorsearch';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                ,'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
                ,'Accept':'application/json'
                ,'Access-Control-Allow-Headers': ['origin','content-type','accept']
            },
            body:JSON.stringify(jsonData)
        }).then(
            response=>{
                if (!response.ok) {
                    console.error('NETWORK ERROR');
                    throw new Error('Network response was not ok');
                }
                console.log("RETURN");
                return response.json();
            }
        ).then(
            data=>{
                console.log('GETTING DATA');
                console.log(data['PAYLOAD']);
                TableHTML=CreateTableHTML(data);
                return res.render(template,{'HTML_TABLE':TableHTML});
            }
        )
    }
    catch{
        console.log("CODE ERROR");
    };

    

}
);
router.post('/LoadVectorSearch_NewPage_ButtonClick',async(req,res) => {
    // code to run the search from a landing page
    console.log("LOAD NEW PAGE");
    let template="./app//views/05/search-results-all-fromNodeJS_template.html";
    
    //let userinput="Cells and animals";
    //let userlocation='Coventry';
    //let cutoff_param='L25';
    
    //jsonData={
    //    'userinput':userinput,
    //    'location':userlocation,
    //    'cutoff_param':cutoff_param
    //};

    

    try { 
        inputdata=req.body;
        console.log("REQUEST");
        //console.log(req);
        
        //console.log(`USER QUERY: ${decodeURIComponent(req.query.userinput)}`);
        //console.log(`USER LOCATION: ${decodeURIComponent(req.query.location)}`);
        console.log(req.body);

        let userinput="Jobs: "+req.session.data['subject-1']+", Subjects: "+req.session.data['job-1'];
        let userlocation=req.session.data['location-guided'];
        let cutoff_param='L25';

        let jsonData={};
        jsonData['userinput']=userinput;
        jsonData['location']=userlocation;
        jsonData['cutoff_param']=cutoff_param;
        console.log("Get JSON");
        const url='http://127.0.0.1:5000/runvectorsearch';
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                ,'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
                ,'Accept':'application/json'
                ,'Access-Control-Allow-Headers': ['origin','content-type','accept']
            },
            body:JSON.stringify(jsonData)
        }).then(
            response=>{
                if (!response.ok) {
                    console.error('NETWORK ERROR');
                    throw new Error('Network response was not ok');
                }
                console.log("RETURN");
                return response.json();
            }
        ).then(
            data=>{
                console.log('GETTING DATA');
                console.log(data['PAYLOAD']);
                TableHTML=CreateTableHTML(data);
                return res.render(template,{'HTML_TABLE':TableHTML});
            }
        )
    }
    catch{
        console.log("CODE ERROR");
    };

    

}
);
module.exports = router