(function() {
    function criarFaixas() {
        const elementosComFaixas = document.querySelectorAll('[faixas]')
        elementosComFaixas.forEach(el => {
            const qtde = +el.getAttribute('faixas')
            for (let i = 0; i < qtde; i++) {
                const faixa = document.createElement('div')
                faixa.classList.add('faixa')
                el.appendChild(faixa)
            }
        })
    }
    
    criarFaixas()
})()

