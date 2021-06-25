var express = require('express');
var router = express.Router();
const data = require('../data/user');


router.get('/', async (req,res)=>{
	const result = await data.getAllUsers();
	res.send(result);
});

router.get('/:id', async (req, res)=>{

    const user = await data.findById(req.params.id);
    res.send(user);
});

router.post('/', async(req,res)=>{
	try{
		const user = await data.findById(req.body._id);
		const token = await data.generateJWT(user);
		res.send({user,token})
	} catch (error){
		res.status(401).send(error.message);
	}

});


router.put('/', async (req, res)=>{
  // var reqBody = req.body;
  
    // let user = {...req.body,_id: req.body._id};
    let userUpdated = await data.addUser(req.body);
    // console.log(JSON.stringify(user));
    res.send(userUpdated);

});

module.exports = router;
