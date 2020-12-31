const bcrypt = require('bcrypt');



const run = async()=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash('1234',salt);
        console.log(salt);
        console.log(hashed);
    }
    catch(err){
        console.log(err.message);
    }
}
run();
