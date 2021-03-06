const urlParams = new URLSearchParams(window.location.search); // URLSearchParams 는 현재 켜져있는 url을 가져옴
const article_id = urlParams.get('id'); //아까 ?뒤에 id= 값을 가져오는 법
console.log(article_id)
let liked = false





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
    console.log(article.comments)

    const comment_section = document.getElementById("comment_section")
    comment_section.innerHTML=''
    // 코멘트가 쓸때마다 중복으로 1개 2개 3개 4개 작성되는것을, 중간에 비워줌으로써 방지

    for (let i=0; i<article.comments.length; i ++){
        const new_comment = document.createElement("p")
        new_comment.innerText = article.comments[i].content
        comment_section.appendChild(new_comment)
    }
    
    // 좋아요 업데이트
    updateLike()

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

async function writeComment(){
    const comment_content = document.getElementById("comment_content")
    // html id = "comment_content" 에서 값을 가져오기
    const comment = await postComment(article_id, comment_content.value)
    // 갖고온 텍스트와 article_id를 postComment로 보내준다
    loadArticle(article_id)
    comment_content.value = ''
    // 작성 한 이후 칸에 텍스트를 비우기
}



//좋아요 기능
async function likeArticle() {
    const like_button = document.getElementById("like_button")
    like_button.classList.toggle("fa-thumbs-down");
    // fa-thumbs-down이란 클래스가 없으면 만들어주고 있으면 없애줌

    if(!liked){
        const response = await postLike(article_id)
        console.log(response, "좋아요")
        like_button.innerText = parseInt(like_button.innerText) +1
        // 좋아요 개수 프론트엔드
        liked = true
    }else{
        const response = await deleteLike(article_id)
        console.log(response, "좋아요 취소")
        like_button.innerText = parseInt(like_button.innerText) -1
        // 좋아요 개수 프론트앤드
        liked = false
    }


}


async function updateLike(){
    const response = await getLike(article_id)
    console.log(response)
    liked = response.liked
    if(liked){
        like_button.classList.toggle("fa-thumbs-down");
    }

}



loadArticle(article_id)







