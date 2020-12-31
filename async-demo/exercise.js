
const getCustomer = (id) =>{
  const p = new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      })
    },4000);
  });
  return p;
}

const getTopMovies = ()=>{
  const p = new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(['movie1', 'movie2'])
    },4000);
  });
  return p;
}

const sendEmail = ()=>{
  const p = new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },4000);
  });
  return p;
}

const getAllInfo = async()=>{
  try{
    const customer = await getCustomer(1);
    console.log('Customer', customer);
    if(customer.isGold){
      const movies = await getTopMovies();
      console.log('Top Movies:', movies);

      const email= await sendEmail();
      console.log('Email send...');
    }
  }
  catch(err){
    console.log(new Error(err.message));
  }
}
getAllInfo();