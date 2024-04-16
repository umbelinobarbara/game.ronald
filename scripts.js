// selecionando os elementos do jogo
const ronald = document.querySelector(".ronald");
const cenario = document.querySelector(".cenario");
const obstaculo = document.querySelector(".obstaculo");

// quando o usuario pressiona uma tecla a classe "pulo" é adicionada e acontece a animação,
// quando a animação acaba a classe é removida pra poder aciona-lá novamente
const pulo = () => {
    ronald.classList.add("pulo");
    setTimeout(() => {
        ronald.classList.remove("pulo");
    }, 500);
};

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// soma a pontuação a cada 1.5 segundos (mais ou menos o tempo pra pular o obstaculo), enquanto não há colisão
async function contaPontos() {
    for (let i = 0; i < 100; i++) {
        document.querySelector(".pontos").innerHTML = `Pontuação: ${i}`;
        await sleep(1500);
    }
}
contaPontos();

const loop = setInterval(() => {
    // pegando a posição dos elementos no gameboard
    const posicao_obstaculo = obstaculo.offsetLeft;
    const posicao_ronald = window
        .getComputedStyle(ronald)
        .bottom.replace("px", "");
    const posicao_cenario = cenario.offsetLeft;

    // FIM DE JOGO
    if (
        posicao_obstaculo < 130 &&
        posicao_obstaculo > 0 &&
        posicao_ronald <= 120
    ) {
        // remove as animações
        obstaculo.style.animation = "none";
        cenario.style.animation = "none";

        // para a posição dos elementos onde houve a colisão
        obstaculo.style.left = `${posicao_obstaculo}px`;
        ronald.style.bottom = `${posicao_ronald}px`;
        cenario.style.left = `${posicao_cenario}px`;
    

        // mudanças visuais no ronald
        ronald.style.animation = "animacao-morte 1,5s ease-out forwards";
        ronald.src = "./img/morte1.gif"

        // remove a classe "pontos" para encerrar a contagem dos pontos
        document.querySelector(".pontos").classList.remove("pontos");

        // torna visível o botão para reiniciar o jogo
        document.querySelector(".btn-restart").style.visibility = "visible";

        // encerrar o jogo
        clearInterval(loop);
    }
}, 10);
document.addEventListener("keydown", pulo);

// recarrega a página para reiniciar o jogo
function recarregaPagina() {
    window.location.reload();
}