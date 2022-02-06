const login = async (email , password)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        if (res){
            location.assign('/');
        }else{
            location.reload();
        }
    }catch(err){
        console.log('error');
    }
}


document.querySelector('.login').addEventListener('submit' , e=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email , password);
    login(email , password);
});