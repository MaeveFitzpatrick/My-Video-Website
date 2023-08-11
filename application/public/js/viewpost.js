

function buildCommentDiv(data){
    const dateString = new Date().toLocaleString("en-us", {
        dateStyle:"full"
    });
    const divComment = document.createElement('div');
    divComment.id = `message-${data.commentId}`;
    divComment.classList.add('comment');
    const usernametag = document.createElement('p')
    usernametag.classList.add('comment-author');
    usernametag.appendChild(document.createTextNode(data.username));
    const datetag = document.createElement('p');
    datetag.appendChild(document.createTextNode(dateString));
    datetag.classList.add('comment-date');
    const commentText = document.createElement('div');
    commentText.classList.add('comment-text');
    commentText.appendChild(document.createTextNode(data.commentText));
    divComment.append(usernametag, datetag, commentText);
    return divComment;

}

//store new comments
const commentsList = document.getElementById('commentsList');
//listen for clicks
const commentButton = document.getElementById('commentButton');
//grab text values to upload
const commentTextArea = document.getElementById('commentText');

if(commentButton){
    commentButton.addEventListener('click', function(ev){
        const commentText = commentTextArea.value;
        const postId = ev.currentTarget.dataset.postId;

        const payLoad = {
            postId,
            commentText
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payLoad)
        }

        fetch("/comments/create", fetchOptions)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                if(data.statusCode < 0){
                    window.location.replace(data.redirectTo);
                } else {
                    const commentDiv = buildCommentDiv(data);
                    commentsList.append(commentDiv);
                    commentTextArea.value = "";
                    window.location.replace(`#message-${data.commentId}`)
                }
            })
            .catch(error => console.error(error))
        console.log(payLoad);
    })
}

//allows for use of Enter key to submit
if(commentTextArea){
    commentTextArea.addEventListener('keypress', function(ev){
        console.log(ev);
        const keyPressed = ev.key;
        if(keyPressed === "Enter"){
            console.log('send comment');
        }
    })
}