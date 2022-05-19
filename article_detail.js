const urlParams = new URLSearchParams(window.location.search); // URLSearchParams 는 현재 켜져있는 url을 가져옴
const article_id = urlParams.get('id'); //아까 ?뒤에 id= 값을 가져오는 법
console.log(article_id)





// article 데이터를 가져와서 article 상세페이지에 데이터가 뜨게함
async function loadArticle(article_id){
    const article = await getArticleDetail(article_id);
    console.log(article)
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const user_email = document.getElementById("user_email")
    const time = document.getElementById("time")

    title.innerText = article.title
    content.innerText = article.content
    user_email.innerText = article.user_email
    time.innerText = article.time

}


loadArticle(article_id)







