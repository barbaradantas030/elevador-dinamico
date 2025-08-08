(function () {

    // -------------------- Pavimentos

    function criarTerreo() {
        const janela = document.createElement('div')
        janela.classList.add('janela')

        const terreo = document.createElement('div')
        terreo.classList.add('terreo')
        terreo.setAttribute('andar', 't')
        terreo.appendChild(janela)

        return terreo
    }

    function criarAndar(numero) {
        const porta = document.createElement('div')
        porta.classList.add('porta')

        const andar = document.createElement('div')
        andar.classList.add('andar')
        andar.setAttribute('andar', numero)
        andar.appendChild(porta)

        return andar
    }

    function criarPavimentos() {
        const elementosComAndares = document.querySelectorAll('[andares]')

        elementosComAndares.forEach(elComAndares => {
            const qtde = +elComAndares.getAttribute('andares')

            for (let i = qtde; i > 0; i--) {
                elComAndares.appendChild(criarAndar(i))
            }

            elComAndares.appendChild(criarTerreo())
        })
    }

    criarPavimentos()

    // -------------------- Elevador

    function iniciarComando(comando) {
        const botao = document.querySelector(`[comando="${comando}"]`)
        botao.classList.add('destaque')
    }

    function finalizarComando(comando) {
        const botao = document.querySelector(`[comando="${comando}"]`)
        botao.classList.remove('destaque')
    }

    function iniciarMovimentacao() {
        const elevador = document.querySelector('.elevador')
        elevador.setAttribute('em-movimentacao', '')
    }

    function finalizarMovimentacao() {
        const elevador = document.querySelector('.elevador')
        elevador.removeAttribute('em-movimentacao')
    }

    function emMovimentacao() {
        const elevador = document.querySelector('.elevador')
        return elevador.hasAttribute('em-movimentacao')
    }

    function obterTamanhoElevador() {
        const terreo = document.querySelector('[andar="t"]')
        return terreo.offsetHeight
    }

    function criarElevador() {
        const poco = document.querySelector('.poco')

        const elevador = document.createElement('div')
        elevador.classList.add('elevador')
        elevador.style.height = obterTamanhoElevador()

        poco.appendChild(elevador)
    }

    function obterPosicaoAtual() {
        const elevador = document.querySelector('.elevador')
        return +elevador.style.bottom.replace('px', '')
    }

    function atualizarMostrador(texto) {
        const mostrador = document.querySelector('.mostrador')
        mostrador.innerHTML = texto
    }

    function moverElevadorPara(andar) {
        if(emMovimentacao()) return

        iniciarMovimentacao()
        iniciarComando(andar)


        const numero = andar === 't' ? 0 : +andar
        const elevador = document.querySelector('.elevador')

        const posicaoInicial = obterPosicaoAtual()
        const posicaoFinal = numero * obterTamanhoElevador()
        const subindo = posicaoFinal > posicaoInicial

        atualizarMostrador(subindo ? 'Subindo' : `Descendo`)

        let temporizador = setInterval(() => {
            const novaPosicao = obterPosicaoAtual() + (subindo ? 10 : -10)
            const terminou = subindo ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal
            elevador.style.bottom = terminou ? posicaoFinal : novaPosicao

            if (terminou) {
                clearInterval(temporizador)
                atualizarMostrador(andar === 't' ? 'Térreo' : `${andar} Andar`)
                finalizarMovimentacao()
                finalizarComando(andar)
            }
        }, 30)

    }

    function aplicarControlesDoElevador() {
        const botoes = document.querySelectorAll('[comando]')
        botoes.forEach(botao => {
            const comando = botao.getAttribute('comando')
            botao.onclick = function () {
                moverElevadorPara(comando)
            }
        })
    }

    criarElevador()
    aplicarControlesDoElevador()
})()
