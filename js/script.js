const seleção = document.querySelector('.seleção');
const mesaDeJogo = document.querySelector('.tabuleiro-de-jogo');
const vencedor = document.querySelector('.vencedor');

let tabuleiroDeJogo, usuário = 'X', computador = 'O';
const células = document.querySelectorAll('.célula');
const combinaçãoDeVitória = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];

const selecioneJogador = jogador => {

    usuário = jogador;
    computador = (jogador === 'X') ? 'O' : 'X';

    tabuleiroDeJogo = Array.from(Array(9).keys());

    for (let célula of células) {
        célula.addEventListener('click', handleClick, false);
    }

    if (computador === 'X') {
        turno(melhorPontuação(), computador);
    }

    seleção.classList.add('fadeOut');
    setTimeout(() => { seleção.style.display = 'none' }, 290);

    mesaDeJogo.classList.add('fadeIn');
    setTimeout(() => { mesaDeJogo.style.display = 'block' }, 290);

}

const startGame = () => {

    vencedor.classList.remove('fadeIn');
    vencedor.classList.add('fadeOut');
    setTimeout(() => { vencedor.style.display = 'none' }, 290);

    mesaDeJogo.classList.remove('fadeIn');
    mesaDeJogo.classList.add('fadeOut');
    setTimeout(() => { mesaDeJogo.style.display = 'none' }, 290);

    seleção.classList.add('fadeIn');
    setTimeout(() => { seleção.style.display = 'block' }, 290);

    for (let célula of células) {
        célula.innerHTML = '';
        célula.style.color = '#000';
        célula.style.background = '#ff9eb150';
    }

}

startGame();

const handleClick = espaçoDeJogo => {

    if (typeof tabuleiroDeJogo[espaçoDeJogo.target.id] === 'number') {

        turno(espaçoDeJogo.target.id, usuário);
        if (!verificarVitória(tabuleiroDeJogo, usuário) && !verificarEmpate()) {
            setTimeout(() => { turno(melhorPontuação(), computador) }, 500);
        }
    }

}

const turno = (areaId, jogador) => {

    tabuleiroDeJogo[areaId] = jogador;
    document.getElementById(areaId).innerHTML = jogador;

    let vitória = verificarVitória(tabuleiroDeJogo, jogador);
    if (vitória) {
        fimDeJogo(vitória);
    }

    verificarEmpate();

}

const verificarVitória = (mesa, jogador) => {

    let spaces = mesa.reduce((acc, ele, idx) => (ele === jogador) ? acc.concat(idx) : acc, []);
    let vitória = null;

    for (let [index, winComboSpaces] of combinaçãoDeVitória.entries()) {
        if(winComboSpaces.every(elem => spaces.indexOf(elem) > -1)) {
            vitória = { index: index, jogador: jogador };
            break;
        }
    }

    return vitória;

}

const fimDeJogo = ganhouJogo => {
    for (let index of combinaçãoDeVitória[ganhouJogo.index]) {
        document.getElementById(index).style.color = '#FFF';
        document.getElementById(index).style.backgroundColor = '#B33951';
    }

    for (let célula of células) {
        célula.removeEventListener('click', handleClick, false);
    }

    declararVencedor(ganhouJogo.jogador === usuário ? "Você ganhou o jogo!" : "O computador ganhou o jogo!");
}

const declararVencedor = mensagem => {
    vencedor.querySelector('h3').innerHTML = mensagem;
	

    setTimeout(() => {

        mesaDeJogo.classList.remove('fadeIn');
        mesaDeJogo.classList.add('fadeOut');
        setTimeout(() => { mesaDeJogo.style.display = 'none' }, 290);   

        vencedor.classList.add('fadeIn');
        setTimeout(() => { vencedor.style.display = 'block' }, 290);    
         
    }, 1500);
}


const melhorPontuação = () => {
    return minMax(tabuleiroDeJogo, computador).index;
}

const quadradosVazios = () => {
    return tabuleiroDeJogo.filter((elm, i) => i === elm);
}

const verificarEmpate = () => {

    if (quadradosVazios().length === 0) {
        seleção.classList.remove('fadeOut');

        for (let célula of células) {
            célula.style.backgroundColor = "#B33951";
			
            célula.removeEventListener('click', handleClick, false);
        }
		
        declararVencedor("O jogo deu empate!");
		
        return true;
    }

    return false;

}

const minMax = (testBoard, jogador) => {

    let espaçosAbertos = quadradosVazios(testBoard);

    if (verificarVitória(testBoard, usuário))
        return { pontuação: -10 };
    else if (verificarVitória(testBoard, computador))
        return { pontuação: 10 };
    else if (espaçosAbertos.length === 0)
        return { pontuação: 0 };

    let movimentos = [];

    for (let i = 0; i < espaçosAbertos.length; i++) {

        let mover = {};
        mover.index = testBoard[espaçosAbertos[i]];
        testBoard[espaçosAbertos[i]] = jogador;

        if (jogador === computador) 
            mover.pontuação = minMax(testBoard, usuário).pontuação;
        else
            mover.pontuação = minMax(testBoard, computador).pontuação;

        testBoard[espaçosAbertos[i]] = mover.index;

        if ((jogador === computador && mover.pontuação === 10) || (jogador === usuário && mover.pontuação === -10))
            return mover;
        else
            movimentos.push(mover)

    }

    let melhorMovimento, melhorPontuação;

    if (jogador === computador) {

        melhorPontuação = -1000;
        for (let i = 0; i < movimentos.length; i++) {
            if (movimentos[i].pontuação > melhorPontuação) {
                melhorPontuação = movimentos[i].pontuação;
                melhorMovimento = i;
            }
        }

    } else {

        melhorPontuação = 1000;
        for (let i = 0; i < movimentos.length; i++) {
            if (movimentos[i].pontuação < melhorPontuação) {
                melhorPontuação = movimentos[i].pontuação;
                melhorMovimento = i;
            }
        }

    }

    return movimentos[melhorMovimento];

}