const elements = document.querySelectorAll('.el');

elements.forEach((element_clicked)=>{
    element_clicked.addEventListener('click',()=>{
        getResponse(element_clicked.id);
    })
})

function getResponse(id){
    httpRequest = new XMLHttpRequest();

    httpRequest.open('GET','js/response_module.json');
    httpRequest.send();
    
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4) {
            if(httpRequest.status === 200){
                buildingHTMLWithJSON(httpRequest.response,id);
            }
        }
    }

}

function  buildingHTMLWithJSON(response,id){
    const contentTitle = document.querySelector('.content_title');
    const contentContainer = document.querySelector('.content');    

    let parserHTML = new DOMParser();
    
    let responseJSON = JSON.parse(response);
    let search_content = responseJSON[id];

    let titleHTML = parserHTML.parseFromString("<h1 class='content_title'>"+search_content.title+"</h1>",'text/html');
    let contentHTML = parserHTML.parseFromString("<p class='content'>"+search_content.content+"</p>",'text/html');

   
    contentTitle.replaceWith(titleHTML.querySelector('h1'));
    contentContainer.replaceWith(contentHTML.querySelector('p'));
    
}