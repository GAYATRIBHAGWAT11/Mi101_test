// 3ed18f7e
let searchButton=document.querySelector("#search")
searchButton.addEventListener('click',()=>{
console.log('button pressed');
sendApiRequest()
})

async function sendApiRequest(){
    let API_ID="3ed18f7e";
    let API_KEY="0e0a73291197cbc4985d6ef479f1527b"
    let response=await fetch(``)
    console.log(response);
}

function ApiData(data){

}