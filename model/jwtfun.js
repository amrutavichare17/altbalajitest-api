var jwt        = require('jsonwebtoken');
var SECRETKEY  = "ALTBALAMR";


const verifyJWTToken=async(req,res,next)=>{
	//console.log(req.headers);
	var token = req.headers["authorization"];
	if(token==null && req.body.tokenViaC){
		token=req.body.tokenViaC;
	}
	
	if(token==null && req.query._tVp){
		token= "Bearer " + req.query._tVp;
	}

	if(token==null){
		res.status(401);
		res.send({"name":"authentication missing","code":"57636"});
		return;
 	}

	token = token.split(" ");
	console.log(token);
	var secret = new Buffer.from(SECRETKEY, "base64");
  	var decoded = jwt.verify(token[1], secret, function(err, decoded) {
		if (err) {
			
			console.log(err);
			res.status(401);
			res.send(err);
			return;
		}else{
			req.user=decoded;
			next();
		}
		
	});
	

  	
};


function createJWTToken(){
    //This method is use for create JWT Token. For now its static parameter.
	var newUser={
		username:"amrutavichare17@gmail.com",
		password:"amruta@123"
	};
	var secret = new Buffer(SECRETKEY, "base64");

//	var token = jwt.sign(newUser,secret,{ expiresIn: '10h' });
	// For now token is valid for unlimited time
	var token = jwt.sign(newUser,secret);

	return token;
};

exports.verifyRequest=verifyJWTToken;
exports.createJWTToken=createJWTToken;


