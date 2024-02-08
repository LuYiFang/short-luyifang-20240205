const list = document.querySelectorAll("#contents .yt-simple-endpoint")
urls = {}
list.forEach(v => urls[v.href] = true)
Object.keys(urls)
