

// const baseurl = "https://www.googleapis.com/youtube/v3";
// const apiKey = "";



// async function getVideos(q){
//   const url = `${baseurl}/search?key=${apiKey}&q=${q}&maxResults=20`;
//   const response = await fetch(url)
//   const data = await response.json();
//   const videos = data.items;
//   console.log(videos)
// }
// async function getvedioDetails(videoId){
//     const url = `${baseurl} /videos?part=snippet,contentDetails,statistics&id=video_id&key={apiKey}`;
//     const response = await fetch(url)
//     const data = await response.json();
//     console.log(data)
// }
 
// getVideos("");
// getvedioDetails("")

// const baseurl = "https://www.googleapis.com/youtube/v3";
// const apiKey = "AIzaSyA23bUjUYTSyOhERLMhjvQ6ZNqh-kbL0OU"; // Replace with your actual API key

// async function getVideos(q) {
//   const url = `${baseurl}/search?key=${apiKey}&q=${q}&maxResults=20`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const videos = data.items;
//   console.log( "gettvideos",videos);
// }

// async function getVideoData(videos){
//     let VideoData = [];
//     for(let i=0;i<videos.length;i++){
//       VideoData,push()
//     }
// }

// async function getVideoDetails(videoId) {
//   const url = `${baseurl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getvideodetaial",data);
// }

// getVideos("cats");
// getVideoDetails("QZHVhDjpEkE");
const videoCardContainer = document.querySelector('.video-container');
let api_key = "AIzaSyDRzZCNPxbaQl_kMUMt2Dg9SexUjgHLIfM";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
// search bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})