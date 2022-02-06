const addNNote = async (title , note)=>{
    try{
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/notes/:slug',
            data: {
                title,
                note
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


document.querySelector('.update').addEventListener('submit' , e=>{
    e.preventDefault();
    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    console.log(title , note);
    addNNote(title , note);
});