//const rateLimit = require("express-rate-limit");





//rateLimit
const requestCounts = {};
function rateLimit(req,res,next){
    
        const ip =req.ip;
        const currentTime = Date.now();
        const WindowMs = 60*1000;
        const limit = 5;
    if(requestCounts[ip]==undefined){
       requestCounts[ip]={
        count:1,
        startTime: currentTime
       } ;
      return next();  
    }
    const data = requestCounts[ip];
    if(currentTime- data.startTime >= WindowMs ){
        requestCounts[ip]={
            count:1,
        startTime:currentTime
    };
    return next();
}
   if(data.count>=limit){
    const remainTime = Math.ceil((WindowMs-(currentTime-data.startTime))/1000);
      return res.status(429).render("login", {
        message: `Too many requests. Try again after ${remainTime} seconds.`
    });

   };
  data.count++;
return next();
}


module.exports = rateLimit;