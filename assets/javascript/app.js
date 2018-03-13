/** @returns {string} */

function buildUrl() {
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    queryUrl += "?api-key=00be6c0502aa4565873a8022d2798441";

    var searchTerm = $("#search").val().trim();

    queryUrl += "&q=" + searchTerm;

    var startYear = $("#startyear").val().trim();

    if (parseInt(startYear)) {
        queryURL += "&begin_date=" + startYear + "0101";
    }

    var endYear = $("#endyear").val().trim();

    if (parseInt(endYear)) {
        queryURL += "&end_date=" + endYear + "0101";
    }

    console.log(searchTerm);
   

    return queryUrl;

}

/** @param {object} NYTData */

function updatePage(NYTData) {

    var numArticles = $("#numarticle").val();

    console.log(NYTData);
    console.log("------------------------------------");

    for (var i = 0; i < numArticles; i++) {

        var article = NYTData.response.docs[i];
        var articleCount = i + 1;
        var $articleWell = $("<article>");
        $articleWell.addClass("well");
        $articleWell.attr("id", "article-well-" + articleCount);

        $("#toparticles").append($articleWell);

        var headline = article.headline;

        if (headline && headline.main) {
            console.log(headline.main)

            $articleWell.append(
                "<h3 class='articleHeadline'>" +
                "<span class='label label-primary'>" + articleCount + "</span>" +
                "<strong> " + headline.main + "</strong></h3>"
            );
        }

        var byline = article.byline;

        if (byline && byline.original) {
            console.log(byline.original);

            $articleWell.append("<h5>" + byline.original + "</h5>");
        }

        var section = article.section_name;
        console.log(article.section_name);
        if (section) {
            $articleWell.append("<h5>Section: " + section + "</h5>");
        }

        var pubDate = article.pub_date;
        console.log(article.pub_date);
        if (pubDate) {
            $articleWell.append("<h5>" + article.pub_date + "</h5>");
        }

        $articleWell.append(
            "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
        );
        console.log(article.web_url);
    }

}

function clear() {
    $("#toparticles").empty();
  }
  

$("#search").on("click", function (event) {

    event.preventDefault();

    clear();

    var queryUrl = buildUrl();

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(updatePage);
    console.log()

})

$("#clear").on("click", clear);