const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('fetching data from facebook');
        resolve(['1','2','3']);
    },2000)
})

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('fetching data from google');
        resolve(['4','5','6']);
    },4000)
})

Promise.all([p1,p2])
    .then(res => console.log(res));

