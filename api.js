const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5501"


async function handleSignin(){

    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    
    
    const response = await fetch('http://127.0.0.1:5001/signup',{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )
     
    console.log(response)
    // response_json = await response.json()
    // console.log(response_json)

    if (response.status == 200){
        window.location.replace("http://127.0.0.1:5501/index.html")
    }
    else{   
        alert(response.status)
    }

}

async function handleLogin(){
    console.log("handle login")

    const loginData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById('floatingPassword').value
    }


    const response = await fetch(`${backend_base_url}/login`,{
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )


    console.log(response)

    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

    if (response.status == 200){
        window.location.replace("http://127.0.0.1:5501/index.html")
    }
    else{   
        alert(response.status)
    }

}



async function getName(){

    const response = await fetch(`${backend_base_url}/getuserinfo`,{
        headers:{
            'Authorization':localStorage.getItem("token")
        }
    }
    )
    response_json = await response.json()
    console.log(response_json)

    const username = document.getElementById("username")
    username.innerText = response_json.email

    return response_json.email

}



async function postArticle(title, content){

    const articleData = {
        title: title,
        content: content
    }
    console.log(articleData)


    const response = await fetch(`${backend_base_url}/article`,{
        method:'POST',
        headers:{
            'Authorization':localStorage.getItem("token")},
        body:JSON.stringify(articleData)
        

    }
    )

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/`);

    }else{
        alert(response.status)
    }
}


async function getArticles(){
    const response = await fetch(`${backend_base_url}/article`,{
        method:'GET',

    }
    )

    response_json = await response.json()

    return response_json.articles
    
}