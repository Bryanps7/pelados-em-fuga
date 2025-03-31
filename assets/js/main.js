let des = document.getElementById('des').getContext('2d')

// JOGADOR
let player = new Player(225, 600, 92, 181, '/assets/img/brasilia.png', 0)

// ADVERSÁRIOS
let mexicano = new Mexicano(400, -40, 100, 100, '/assets/img/mexicano.png', 4)
let mulher = new Mulher(200, -280, 100, 100, '/assets/img/mulherObstaculo.png', 4)
let lutador = new Mulher(200, -280, 100, 100, '/assets/img/lutador.png', 12)

let banner = new Imagem()

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()
let t6 = new Text()
let t7 = new Text()
let t8 = new Text()
let t9 = new Text()

let countPts = 2
let destino = "Paraguai"

let motor = new Audio('/assets/aud/videoplayback.m4a')
let mulherSom = new Audio('/assets/aud/mulher.mp3')
let arribaSom = new Audio('/assets/aud/arriba.mp3')
let victory = new Audio('/assets/aud/victory.mp3')
let lutadorSom = new Audio('/assets/audio/elprimo.mp3')

motor.volume = 0.8
motor.loop = true

let jogar = 'iniciar'

document.addEventListener('keydown', (e) => {
    if(e.key === 'm') {
        jogar = 'jogando'
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        player.dir -= 5
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        player.dir += 5
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') {
        player.dir = 0
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        player.dir = 0
    }
})


let sub = 0
function estrada(speed) {
    sub += speed

    document.getElementById('body').style.backgroundPositionY = sub + 'px'
}

function game_over() {
    if (player.vida <= 0) {
        jogar = 'gameOver'
        motor.pause()
        // música com o jogo parado
    }
}

function vitoria() {
    jogar = 'vitoria'
    motor.pause()
}

function pontos() {
    if (player.point(mexicano)) {
        player.distancia -= countPts
    } else if (player.point(mulher)) {
        player.distancia -= countPts
        player.pts += 1
    } else if (player.point(lutador)) {
        player.distancia -= countPts
        player.pts += 2
    }
}

function colisao() {
    if (player.colid(mexicano)) {
        player.pts += 1
        mexicano.recomeca()
        arribaSom.play()
    } else if (player.colid(mulher)) {
        player.vida -= 1
        player.pts -= 1
        mulher.recomeca()
        mulherSom.play()
    } else if (player.colid(lutador)) {
        player.vida -= 2
        player.pts -= 2
        lutador.recomeca()
        lutadorSom.play()
    }
}

function desenha() {
    t1.des_text('Distância: ', 360, 24, '#e8ce5a', '26px Segoe UI')
    t2.des_text(player.distancia + 'km', 474, 24, '#e8ce5a', '26px Segoe UI')
    t3.des_text('Destino: ', 360, 48, '#e8ce5a', '26px Segoe UI')
    t4.des_text(destino, 460, 48, '#e8ce5a', '26px Segoe UI')
    t5.des_text('Vida: ', 40, 24, '#e8ce5a', '26px Segoe UI')
    t6.des_text(player.vida, 100, 24, '#e8ce5a', '26px Segoe UI')
    t7.des_text('Pontos: ', 40, 48, '#e8ce5a', '26px Segoe UI')
    t8.des_text(player.pts, 130, 48, '#e8ce5a', '26px Segoe UI')

    switch (jogar) {
        case 'iniciar':
            banner.des_img('/assets/img/banner.jpeg', 50, 150, 500, 500)
            break;
        case 'jogando':
            if(player.distancia == 0 && destino == 'Paraguai') {
                player.distancia = 100
                destino = "México"
                mexicano.speed = 8
                mulher.speed = 8
                speedEst = 6
            } else if(player.distancia == 0 && destino == 'México') {
                player.distancia = 100
                destino = "Santos"
                mexicano.speed = 12
                mulher.speed = 12
                speedEst = 10
            } else if(player.distancia == 0 && destino == 'Santos') {
                vitoria()
            }
            if(destino == "Santos") {
                lutador.drawPlayer()
            }
            player.drawPlayer()
            mexicano.drawPlayer()
            mulher.drawPlayer()
            break;
        case 'gameOver':
            t9.des_text('Game Over', 150, 340, '#e8ce5a', '46px Segoe UI')
            break;
        case 'vitoria':
            t9.des_text('Vitória', 150, 340, '#e8ce5a', '46px Segoe UI') 
            victory.play()   
            break;
    }
}

let speedEst = 2

function atualiza() {
    if (jogar == 'jogando') {
        motor.play()
        mexicano.mov_carro2()
        mulher.mov_carro2()
        player.mov_carro()
        if(destino == "Santos") {
            lutador.mov_carro2()
        }
        // carro.anim('carro_01_')
        pontos()
        colisao()
        game_over()
        estrada(speedEst)
    }


}

function main() {
    des.clearRect(0, 0, 600, 770)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()