
async function loadArticles(){
    
    articles = await getArticles()
    console.log(articles)

    const article_list = document.getElementById("articles")
    
    // forEach는 for문과 같은 역할
    articles.forEach(article =>{ 
        console.log(article)
        const newArticle = document.createElement("li");
        newArticle.setAttribute("id", article._id)
        newArticle.innerText = article.title

        // onclick을 했을때, articleDetail함수를 실행하면서 this.id를 같이 넣어줌. 위의 id값을 가져옴
        newArticle.setAttribute("onclick","articleDetail(this.id)")

        article_list.appendChild(newArticle)
    });


}

async function checkLogin(){
    const name = await getName();
    console.log(name)

    const username = document.getElementById("username") // index.html에서 id="username"에서 값을 가져오고
    const loginoutButton = document.getElementById("loginout") // loginout버튼을 가져옴

    if(name){ //name이 있다면
        username.innerText = name // id="username"에 있는 innerText를 name으로 바꿔주고
        loginoutButton.innerText = "로그아웃" // 로그아웃 버튼안의 텍스트가 "로그아웃"으로 바꿔주고
        loginoutButton.setAttribute("onclick", "logout()") // 클릭했을때 logout()함수가 실행되도록 설정
    }else{
        username.innerText = "로그인해주세요" // 아니라면(name이 없다면) 로그인해주세요를 넣고
        loginoutButton.innerText = "로그인" // 로그인을 넣고
        loginoutButton.setAttribute("onclick", "location.href='/login.html'") // 클릭했을때 login.html로 가도록 설정.
    }

}


loadArticles();
checkLogin();
