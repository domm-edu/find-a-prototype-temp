const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


router.post('/all-nearby-or-nothing', function(request, response) {

    var searchType = request.session.data['all-or-nothing']
    if (searchType == "Search for all courses near an institution"){
        response.redirect("location-institution")
    } else if (searchType == "Answer some questions to get personalised results"){
        response.redirect("location")
    }
    else {
        response.redirect("index")
    }
})




module.exports = router
