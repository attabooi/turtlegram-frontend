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



    const user = await getName()
    if(user.id != article.user){       // article아이디가 user가 같지않다면 
        const update_button = document.getElementById("update_button")
        const delete_button = document.getElementById("delete_button")
        update_button.style.visibility = 'hidden'
        delete_button.style.visibility = 'hidden'
    }
}







function updateMode(){

    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.visibility = "hidden" 
    content.style.visibility = "hidden"

    const input_title = document.createElement("textarea")
    input_title.setAttribute("id", "input_title")
    input_title.innerText = title.innerHTML // 박스안에 타이틀이 들어가있음 (수정하기 편하게)
    
    
    const input_content = document.createElement("textarea")
    input_content.setAttribute("id", "input_content")
    input_content.innerText = content.innerHTML // 박스안에 내용이 들어감
    input_content.rows=10

    const body = document.body
    body.insertBefore(input_title, title)
    body.insertBefore(input_content, content)

    const update_button = document.getElementById("update_button")
    update_button.setAttribute("onclick","updateArticle()") // 수정하기 버튼을 누르면 수정하기에서 등록하기로 바꾸게 하기
}





async function updateArticle(){

    var input_title = document.getElementById("input_title")
    var input_content = document.getElementById("input_content")
    
    const article = await patchArticle(article_id, input_title.value, input_content.value);

    input_title.remove()
    input_content.remove()


    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.visibility = "visible"
    content.style.visibility = "visible"

    update_button.setAttribute("onclick","updateMode()") // 버튼 바뀌게 함

    loadArticle(article_id)



}



async function removeArticle(){
    await deleteArticle(article_id)
    
}





loadArticle(article_id)







