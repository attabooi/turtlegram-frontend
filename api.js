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


// 로그인되어 있으면, 이름이 뜨게하는 함수
async function getName(){

    const response = await fetch(`${backend_base_url}/getuserinfo`,{
        headers:{
            'Authorization':localStorage.getItem("token")
        }
    }
    )


    
    if(response.status==200){ // 토큰이 있으면 200 없으면 401, <-- authorize함수에서 토큰이 안오면 401로 표시하게 함
        response_json = await response.json()
        console.log(response_json)
        return response_json

    }else{
        return null
    }

    

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


// 백엔드와 송신을 하지 않기때문에 async를 붙이지 않아도된다.
function logout(){
    localStorage.removeItem("token") //로컬스토리지 토큰값제거해주기
    window.location.replace(`${frontend_base_url}/`); // 제거 후 새로고침 기능
}



// 게시물을 클릭했을때 detail로 들어가기 위한 함수
function articleDetail(article_id){
    console.log(article_id)

    const url = `${frontend_base_url}/article_detail.html?id=${article_id}` //article_id로 가는 주소
    location.href = url
}

// 게시물 상세 페이지에 있는 id를 /article/<article_id>에 접속을 해서 가져오는 것 
async function getArticleDetail(article_id){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        method:'GET',
    })
    response_json = await response.json()
    console.log(response_json)

    return response_json.article
}


async function patchArticle(article_id, title, content){

    const articleData = {
        "title": title,
        "content": content

    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        headers:{
            'Authorization': localStorage.getItem("token")},

        method:'PATCH',
        body: JSON.stringify(articleData)
        

    }
    )
    

    if (response.status == 200){
        response_json = await response.json()
        return response_json
    }else{
        alert(response.status)
    }
    
    
}



async function deleteArticle(){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        headers: {
            'Authorization':localStorage.getItem("token")},
        method:'DELETE',
    }
    )
    


    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/`); //삭제했을때 다시 메인으로
        
    }else{
        alert(response.status)
    }

}