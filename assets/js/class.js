class Obj {
    constructor(x, y, w, h, a, speed) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
        this.speed = speed
    }
    des_obj() {
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }
}

class Player extends Obj {
    dir = 0
    distancia = 100
    pts = 0
    vida = 5
    frame = 1
    tempo = 0

    drawPlayer() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    mov_carro() {
        this.x += this.dir
        if (this.x <= 2) {
            this.x = 2
        } else if (this.x >= 416) {
            this.x = 416
        }
    }

    point(objeto) {
        if ((objeto.y >= 680) && (objeto.y <= 684)) {
            return true
        } else {
            false
        }
    }

    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        } else {
            false
        }
    }
}

class Mexicano extends Player {
    mov_carro2() {
        this.y += this.speed
        if (this.y >= 780) {
            this.recomeca()
        }
    }

    recomeca() {
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2)) // quando o mexicano sair da tela
    }
}

class Mulher extends Player {
    mov_carro2() {
        this.y += this.speed
        if (this.y >= 780) {
            this.recomeca()
        }
    }
    
    recomeca() {
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2)) // quando a mulher sair da tela
    }
}

class Estrada extends Obj{

}

class Text {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text, x, y)
    }
}

class Imagem {
    des_img(url, x, y, w, h) {
        let img = new Image()
        img.src = url
        des.drawImage(img, x, y, w, h)
    }
}

class Place extends Obj {
    drawPlace() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
    
    mov_place() {
        this.y += this.speed
        if (this.y >= 780) {
            this.recomeca()
        }
    }
}