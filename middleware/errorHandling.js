function errorHandling(err, res, next){
    if(err|| res.statusCode >= 400){
        res.json({
         status: err.status ||
         res.statusCode || 500,
         err: "An error occoured. PLease try again later"   
        })
    }
    next()
}

export{
    errorHandling
}