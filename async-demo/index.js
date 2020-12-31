

const getuser = (id) => {
    
    const p = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Reading from database......');
            resolve({id: id, name:'Abhijit'});
        }, 5000)
    });

    return p;
}


const getRepo = (userName) => {
    
    const p = new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Calling Giyhub API.......');
            // resolve(['repo1','repo2', 'repo3']);
            reject( new Error('could not get repos...'));
        },3000)
    })
    return p;
}

const getCommit = (repo) => {
    const p =  new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('Fetching all the commits');
            resolve(['commit']);
        },4000)
    });
    return p;
}

//Promise based appproach

// getuser(1)
//     .then(user => getRepo(user))
//     .then(repo => getCommit(repo[0]))
//     .then(commit => console.log('commits: ', commit));


// Asyn and Await approach

const getInfo = async() =>{
    try {
        const user = await getuser(1);
        const repos = await getRepo(user.name)
        const commmits = await getCommit(repos[0]);
        console.log(commmits);
    }
    catch(err) {
        console.log(err.message);
    }
    
}

getInfo();