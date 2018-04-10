/**
 * Created by WafelWeedJr on 2017-05-04.
 */

var createRequest = function () {
    var request=null;
    if(window.XMLHttpRequest){
        request= new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return request;
};

var whenWritten = function (time) {
    var inSecArticleTime=Date.parse(time)/1000;
    var date = new Date();
    var inSecNow=Date.parse(date)/1000;

    var difference=inSecNow-inSecArticleTime;

    if(difference==0 || difference==1){
        return " • "+difference + "A second ago";

    } else if(difference<60){

        return difference + " seconds ago";
    } else if(difference>=60 && difference<120){
        return " • 1 min ago";
    } else if(difference<60*60){                                //1s 60*1min 60*60*1h 60*60*24*1day +" • "+
        return " • "+Math.floor(difference/60)+" mins ago";


    } else if(difference>=60*60 && difference<60*60*2){
        return " • 1 hour ago";

    } else if(difference<60*60*24){
        return " • "+Math.floor(difference/(60*60)) + " hours ago";


    } else {
        return "";

    }




    //2017-05-15T15:16:04+00:00


};

var getResponse = function () {
    var request=createRequest();
    var response;
    if(request===null){
        alert("Artykuły nie mogły zostać pobrane, proszę odświeżyć stronę, jeśli to nie pomoże, to proszę o kontakt z administratorem strony");
        return null;
    }

    var url="https://newsapi.org/v1/articles?source=buzzfeed&apiKey=48cce0efed514accb86d6765f31a3fcc";


    request.onreadystatechange = function () {
        if(request.readyState==4 && request.status==200){
            response=request.responseText;
            response=JSON.parse(response);
            var content="";



            if(response.status==="ok"){

                if( response.hasOwnProperty("articles") ){

                    var main=document.querySelector(".container");

                    var articles = response.articles;

                    articles.forEach(function (article) {
                        content +=
                            "<article>"
                            + "<img src=" + article.urlToImage + ">"
                            + "<div class='art_content'>"
                            + "<a href="+ article.url +">"
                            + "<h2>" + article.title + "</h2>"
                            + "</a>"
                            + "<a href="+ article.url +">"
                            + "<p>" + article.description + "</p>"
                            + "</a>"
                            + "<span class='art_author'>"+ article.author+whenWritten(article.publishedAt)+"</span>"
                            + " </div>"
                            + "</article>";
                    });


                    main.innerHTML=content;



                }
                else {
                    content="<p> There is no articles </p>";
                    return -1;

                }


            } else{
                content="<p> There is no articles </p>";
                return -1;

            }

            main.innerHTML=content;

        }
    };


    request.open("GET",url,true);
    request.send(null);
    return response;


};

var response=getResponse();
/**
 * Created by WafelWeedJr on 2017-05-14.
 */
