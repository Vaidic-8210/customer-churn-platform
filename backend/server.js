require("dotenv").config();

require("./db");

const express=require("express");

const cors=require("cors");

const predictionRoutes=
require("./routes/predictionRoutes");

const app=express();


app.use(
cors()
);

app.use(
express.json()
);


app.get(
"/",
(req,res)=>{

res.json({

message:
"Backend Server Running"

});

}
);


app.use(
"/api",
predictionRoutes
);


const PORT=5000;


app.listen(

PORT,

()=>{

console.log(
`Server running on port ${PORT}`
);

}

);