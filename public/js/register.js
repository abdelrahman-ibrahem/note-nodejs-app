
const register = async (username , email , password , passwordConfirm)=>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/register',
            data: {
                username,
                email,
                password,
                passwordConfirm
            }
        });
        if (res){
            location.assign('/login');
        }else{
            location.reload();
        }
    }catch(err){
        console.log('error' , err.message);
    }
}


document.querySelector('.register').addEventListener('submit' , e=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    register(username , email , password , passwordConfirm);
});