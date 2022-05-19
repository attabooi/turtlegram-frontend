function handleArticleCreate(){
    console.log("create article")
    const title = document.getElementById("article_title").value
    const content = document.getElementById("article_content").value

    postArticle(title,content)
}


