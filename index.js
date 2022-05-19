
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
        article_list.appendChild(newArticle)
    });


}


loadArticles();
getName();
