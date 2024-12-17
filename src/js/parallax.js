function createLayer(img_url) {
    const layer = document.createElement('div')
    const img = document.createElement('img')
    layer.classList.add('layer-preload')
    img.src = img_url
    layer.appendChild(img)
    return layer
}

window.addEventListener('load', () => {
    const MainScene = document.getElementById('scene')
    // let valScroll = 0
    // MainScene.innerText = 'load success'
    MainScene.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            MainScene.appendChild(MainScene.children[0])
        } else {
            MainScene.insertBefore(MainScene.children[5], MainScene.children[0])
        }
        // valScroll = e.deltaY > 0 ? ++valScroll : --valScroll
        // MainScene.children[0].classList.replace('layer-preload', 'layer')

        // console.log(e);
    })
})