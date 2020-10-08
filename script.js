// https://picsum.photos/v2/list
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

const apiUrl = `https://picsum.photos/v2/list`
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        // console.log('ready = ', ready)
    }
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {}
}

// helper function for setAttribute
function setAttrbtsHelper(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    // console.log('total images', totalImages)
    // run function for each object in the photosArray
    photosArray.forEach((photo) => {
        // const item = document.createElement('a')
        // item.setAttribute('href', photo.download_url)
        // item.setAttribute('target', '_blank')
        // setAttrbtsHelper(item, {
        //     href: photo.download_url,
        //     target: '_blank',
        // })

        // create <img> element for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.download_url)
        setAttrbtsHelper(img, {
            src: photo.download_url,
            width: '20%',
            height: '20%',
            alt: photo.author,
        })
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // put <img> inside <a>, then put both inside imageContainer
        // item.appendChild(img)
        imageContainer.appendChild(img)
    })
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos()
    }
})

// on load
getPhotos()
