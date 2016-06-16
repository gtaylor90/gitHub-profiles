// initial set up 
var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        if (key === "access_token" && !paramObject[access_token]) {
            continue
        }
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0, outputString.length - 1)
}
var name

try {
    var token = GLOBAL_TOKEN
} catch (e) {
    var token = ''
}




// console.log(name)
// console.log('token>>>' + token)


var url = 'https://api.github.com/users/magentanova'

var gitParams = {
    access_token: token
}

var userPromise = $.getJSON(url + genParamString(gitParams))
var reposPromise = $.getJSON(url + '/repos' + genParamString(gitParams))

var handleRepos = function(apiResponse) {
    // console.log('sanitycheck > repos')
    // console.log(userPromise)
    console.log(apiResponse)
    var userObj = {}
    for (var i = 0; i < apiResponse.length; i++) {
        var userObj = apiResponse[i]
            // console.log(userObj)
    }
}
var rightColumn = document.querySelector('#rCol')

var reposDataHanlder = function(reposResponse) {
        console.log('eyyy we got some repos')
            // console.log(reposReponse)
        var htmlCards = ''
        for (var i = 0; i < reposResponse.length; i++) {
            var repoObj = reposResponse[i],
                repoUrl = repoObj.html_url,
                repoName = repoObj.name,
                repoDate = repoObj.updated_at

            htmlCards += '<div class="repoCard">'
            htmlCards += '<a href ="' + repoUrl + '" class ="repoName">' + repoName + '</a>'
            htmlCards += '<p> updated: ' + repoDate + '</p>'
            htmlCards += '</div>'

        }
        rightColumn.innerHTML = htmlCards

    }
    /*

    Lef Column
    <div id="lCol">
         <div id="profile">
            <img src="https://avatars3.githubusercontent.com/u/17018179?v=3&s=400">
            <h2>userName</h2>
            <p>former baby. current something. future ghost.</p>
            <h3>location</h3>
            <h3>joined date</h3>
        </div>
        <div id="numbersRow">
            <div id="followers" class="numbers">
                <a href="https://avatars3.githubusercontent.com/u/17018179?v=3&s=400">0</a>
                <p>followers</p>
            </div>
            <div id="starred" class="numbers">
                <a href="https://avatars3.githubusercontent.com/u/17018179?v=3&s=400">0</a>
                <p>starred</p>
            </div>
            <div id="following" class="numbers">
                <a href="https://avatars3.githubusercontent.com/u/17018179?v=3&s=400">0</a>
                <p>following</p>
            </div>
        </div>
    </div>

    Right Column
    <div id="rCol">
        <div class="repoCard">
            <a href="google.com" class="repoName">RepoInfo</a>
            <p>updated on:</p>
        </div>
    </div>
    */

var leftColumn = document.querySelector('#lCol')

var handleUser = function(apiResponse) {
    console.log('sanitycheck > user')
    console.log(apiResponse)
        // console.log(apiResponse)
    var userName = apiResponse.login
    console.log('username ' + userName)
        // blog
    var userBio = apiResponse.bio
        // location
    var userLocation = apiResponse.location
        // date created
    var userDate = apiResponse.created_at
        // image with avatar
    var imgUrl = apiResponse.avatar_url
        // followers
    var userFollowers = apiResponse.followers
    var followersUrl = apiResponse.followers_url
        // starred
    var userStarred = apiResponse.followers
    var starredUrl = apiResponse.starred
        // following
    var userFollowing = apiResponse.following
    var followingUrl = apiResponse.following_url
    var htmlText = ''

    // begin html for inner HTML
    htmlText += '<div id = "profile">'
    htmlText += '<img src="' + imgUrl + '">'
    htmlText += '<h2>' + userName + '</h2>'
    htmlText += '<p>' + userBio + '</p>'
    htmlText += '<h3>' + userLocation + '</h3>'
    htmlText += '<h3> Joined: ' + userDate + '</h3>'
    htmlText += '</div>'
    htmlText += '<div id = "numbersRow">'
    htmlText += '<div id = "followers" class="numbers">'
    htmlText += '<a src="' + followersUrl + '">' + userFollowers + '</a>'
    htmlText += '<p>followers</p>'
    htmlText += '</div>'
    htmlText += '<div id = "starred" class="numbers">'
    htmlText += '<a src="' + userStarred + '">' + userFollowers + '</a>'
    htmlText += '<p>starred</p>'
    htmlText += '</div>'
    htmlText += '<div id = "following" class="numbers">'
    htmlText += '<a src="' + followingUrl + '">' + userFollowing + '</a>'
    htmlText += '<p>following</p>'
    htmlText += '</div>'
    htmlText += '</div>'

    leftColumn.innerHTML = htmlText
        // console.log(htmlText)
}

userPromise.then(handleUser)
reposPromise.then(reposDataHanlder)
