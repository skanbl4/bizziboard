window.addEventListener('load', () => {
    const MainScene = document.getElementById('scene').children[2]
    const count_layers = MainScene.children.length
    let processing = false
    MainScene.addEventListener('wheel', async (e) => {
        if (!processing) {
            processing = true
            // MainScene.children[1].addEventListener('transitionstart', () => {
            //     console.log(MainScene.children[1]);
            //     console.log('transition - start');
            // })
            // MainScene.children[1].addEventListener('transitionend', () => {
            //     console.log('transition - end');
            // })
            if (e.deltaY < 0) {
                MainScene.appendChild(MainScene.children[0])
            } else {
                MainScene.insertBefore(MainScene.children[count_layers - 1], MainScene.children[0])
            }
            await setTimeout(() => processing = false, 550)
        } else {

        }
    })
})