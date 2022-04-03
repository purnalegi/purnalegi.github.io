let postsArray = [
[ "blogs/2022-04-01-Membuat-Akun-Versi-Gratis-Di-Github.html" ],
[ "blogs/2022-04-01-Membuat-Folder-Repositori-Di-Github.html" ],
[ "blogs/2022-04-01-Mengganti-Foto-Profil-Di-Github.html" ],
[ "blogs/2022-04-01-Menghosting-Situs-Di-Github.html" ]
];
let url = window.location.pathname;
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;
let relativePath = ".";
if ( url.includes("blogs/") ) {
  relativePath = "..";
}
let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf('blogs/'));
let i;
for (i = 0; i < postsArray.length; i++) {
  if ( postsArray[i][0] === currentFilename ) {
    currentIndex = i;
  }
}
function formatPostTitle(i) {
  if ( postsArray[i].length > 1 ) {
    return decodeURI(postsArray[i][1]);
  } else { 
	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  return postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      return postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
}
let currentPostTitle = "";
let niceDate = "";
if ( currentIndex > -1 ) {
  currentPostTitle = formatPostTitle( currentIndex );
  if (  postDateFormat.test ( postsArray[currentIndex][0].slice( 6,17 ) ) ) {
    let monthSlice = postsArray[currentIndex][0].slice( 11,13 );
    let month = "";
    if ( monthSlice === "01") { month = "Januari";}
    else if ( monthSlice === "02") { month = "Februari";}
    else if ( monthSlice === "03") { month = "Maret";}
    else if ( monthSlice === "04") { month = "April";}
    else if ( monthSlice === "05") { month = "Mei";}
    else if ( monthSlice === "06") { month = "Juni";}
    else if ( monthSlice === "07") { month = "Juli";}
    else if ( monthSlice === "08") { month = "Agustus";}
    else if ( monthSlice === "09") { month = "September";}
    else if ( monthSlice === "10") { month = "Oktober";}
    else if ( monthSlice === "11") { month = "November";}
    else if ( monthSlice === "12") { month = "Desember";}
	niceDate = postsArray[currentIndex][0].slice( 14,16 ) + " " + month + " " + postsArray[currentIndex][0].slice( 6,10 );
  }
}
function formatPostLink(i) {
  let postTitle_i = "";
  if ( postsArray[i].length > 1 ) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  postTitle_i = postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      postTitle_i = postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
  if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postTitle_i + '</a></li>';
  } else {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postTitle_i + '</a></li>';
  }
}
let postListHTML = "<ul>";
for ( let i = 0; i < postsArray.length; i++ ) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";
let recentPostsCutoff = 5; //Ubah nomor ini untuk mengatur berapa banyak posting terbaru yang akan ditampilkan sebelum memotongnya dengan tautan "Posting Lainnya".
let recentPostListHTML = "<!-- Posting Lainnya --><ul>";
let numberOfRecentPosts = Math.min( recentPostsCutoff, postsArray.length );
for ( let i = 0; i < numberOfRecentPosts; i++ ) {
  recentPostListHTML += formatPostLink(i);
}
if ( postsArray.length > recentPostsCutoff ) {
  recentPostListHTML += '<li><a href=' + relativePath + '/arisp.html>\u00BB Arsip</a></li></ul>';
} else {
  recentPostListHTML += "</ul>";
}
let nextprevHTML = "";
let nextlink = "";
let prevlink = "";
if ( postsArray.length < 2 ) {
  nextprevHTML = '<a href="' + relativePath + '/index.html" style="display: none;">Home</a>';
} else if ( currentIndex === 0 ) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/index.html" style="display: none;">Home</a> <a href="'+ relativePath + '/' + prevlink +'" class="prevlink">Posting Selanjutnya \u00BB</a>';
} else if ( currentIndex === postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML = '<a href="' + relativePath + '/' + nextlink +'" class="nextlink">\u00AB Posting Sebelumnya</a> <a href="' + relativePath + '/index.html" style="display: none;">Home</a>';
} else if ( 0 < currentIndex && currentIndex < postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/'+ nextlink +'" class="nextlink">\u00AB Posting Sebelumnya</a> <a href="' + relativePath + '/index.html" style="display: none;">Home</a> <a href="' + relativePath + '/'+ prevlink +'" class="prevlink">Posting Selanjutnya \u00BB</a>';
}
if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.title === "Blog Post") {
  document.title = currentPostTitle;
}
const d = new Date();
let text = d.toLocaleTimeString();
document.getElementById("postTime").innerHTML = text;