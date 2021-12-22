message = module.exports;

message.success = (msg,data)=>{
   
    
    return {
        status: "success" ,
        message: msg,
        // statusCode: statusCode,
        data: data || []
    };
}
message.error = (msg)=>{
   
    
    return {
        status: "error" ,
        message: msg,
        // statusCode: statusCode,
        data: []
    };
}

// module.exports={successResponse,errorResponse};
