const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');
const botoesFiltro = document.querySelectorAll('.filtro');

<<<<<<< HEAD
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const modoEscuroSalvo = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroSalvo) {
    document.body.classList.add('modo-escuro');

    const iconeTema = botaoAlternarTema.querySelector('i');

    iconeTema.classList.remove('fa-moon');
    iconeTema.classList.add('fa-sun');
}

let filtroAtual = 'todas';

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

=======
let tarefas = [];
let filtroAtual = 'todas';

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;
    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

    contadorTarefas.textContent =
        `${tarefas.length} ${tarefas.length === 1 ? 'tarefa' : 'tarefas'} na lista • ${pendentes} ${pendentes === 1 ? 'pendente' : 'pendentes'} • ${concluidas} ${concluidas === 1 ? 'concluída' : 'concluídas'}`;
}

function tarefasFiltradas() {
    if (filtroAtual === 'pendentes') {
        return tarefas.filter(tarefa => !tarefa.concluida);
    }

    if (filtroAtual === 'concluidas') {
        return tarefas.filter(tarefa => tarefa.concluida);
    }

    return tarefas;
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    const visiveis = tarefasFiltradas();

    if (visiveis.length === 0) {
        const vazio = document.createElement('li');

        vazio.className = 'estado-vazio';

        vazio.textContent =
            filtroAtual === 'todas'
                ? 'Nenhuma tarefa adicionada ainda.'
                : 'Nenhuma tarefa neste filtro.';

        listaTarefas.appendChild(vazio);

        atualizarContador();

        return;
    }

    visiveis.forEach(tarefa => {
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        const itemLista = document.createElement('li');

        itemLista.className =
            `item-tarefa${tarefa.concluida ? ' concluido' : ''}`;

        const texto = document.createElement('span');

        texto.textContent = tarefa.texto;

        const acoes = document.createElement('div');

        acoes.className = 'acoes-tarefa';

        const botaoEditar = document.createElement('button');

        botaoEditar.className = 'botao-acao editar';

        botaoEditar.title = 'Editar tarefa';

        botaoEditar.setAttribute(
            'aria-label',
            'Editar tarefa'
        );

        botaoEditar.innerHTML =
            '<i class="fa-solid fa-pen"></i>';

        botaoEditar.addEventListener('click', () => {
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
            const novoTexto = prompt(
                'Edite sua tarefa:',
                tarefa.texto
            );

            if (novoTexto === null) {
                return;
            }

            const textoLimpo = novoTexto.trim();

            if (!textoLimpo) {
                alert('A tarefa não pode ficar vazia.');
                return;
            }

            tarefa.texto = textoLimpo.slice(0, 40);

<<<<<<< HEAD
            salvarTarefas();

=======
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
            renderizarTarefas();
        });

        const botaoConcluir = document.createElement('button');

        botaoConcluir.className = 'botao-acao concluir';

        botaoConcluir.title =
            tarefa.concluida
                ? 'Marcar como pendente'
                : 'Concluir tarefa';

        botaoConcluir.setAttribute(
            'aria-label',
            botaoConcluir.title
        );

        botaoConcluir.innerHTML =
            tarefa.concluida
                ? '<i class="fa-solid fa-circle-check"></i>'
                : '<i class="fa-regular fa-circle-check"></i>';

        botaoConcluir.addEventListener('click', () => {
<<<<<<< HEAD
            tarefa.concluida = !tarefa.concluida;

            salvarTarefas();
=======

            tarefa.concluida = !tarefa.concluida;
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f

            renderizarTarefas();
        });

        const botaoExcluir = document.createElement('button');

        botaoExcluir.className = 'botao-acao excluir';

        botaoExcluir.title = 'Excluir tarefa';

        botaoExcluir.setAttribute(
            'aria-label',
            'Excluir tarefa'
        );

        botaoExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        botaoExcluir.addEventListener('click', () => {
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
            tarefas = tarefas.filter(
                item => item !== tarefa
            );

<<<<<<< HEAD
            salvarTarefas();

=======
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
            renderizarTarefas();
        });

        acoes.append(
            botaoEditar,
            botaoConcluir,
            botaoExcluir
        );

        itemLista.append(
            texto,
            acoes
        );

        listaTarefas.appendChild(itemLista);
    });

    atualizarContador();
}

function adicionarTarefa() {
<<<<<<< HEAD
    const textoTarefa = campoTarefa.value.trim();

    if (!textoTarefa) {
=======

    const textoTarefa = campoTarefa.value.trim();

    if (!textoTarefa) {

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        alert('Por favor, digite uma tarefa!');

        campoTarefa.focus();

        return;
    }

    tarefas.push({
        texto: textoTarefa.slice(0, 40),
        concluida: false
    });

<<<<<<< HEAD
    salvarTarefas();

=======
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
    campoTarefa.value = '';

    filtroAtual = 'todas';

    botoesFiltro.forEach(botao => {
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        botao.classList.toggle(
            'ativo',
            botao.dataset.filtro === filtroAtual
        );
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
    });

    renderizarTarefas();

    campoTarefa.focus();
}

botoesFiltro.forEach(botao => {
<<<<<<< HEAD
    botao.addEventListener('click', () => {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(item => {
=======

    botao.addEventListener('click', () => {

        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(item => {

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
            item.classList.toggle(
                'ativo',
                item === botao
            );
<<<<<<< HEAD
=======

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        });

        renderizarTarefas();
    });
<<<<<<< HEAD
});

=======

});
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
botaoAdicionar.addEventListener(
    'click',
    adicionarTarefa
);
<<<<<<< HEAD

campoTarefa.addEventListener(
    'keypress',
    evento => {
        if (evento.key === 'Enter') {
            adicionarTarefa();
        }
    }
);

botaoAlternarTema.addEventListener(
    'click',
    () => {
=======
campoTarefa.addEventListener(
    'keypress',
    evento => {

        if (evento.key === 'Enter') {
            adicionarTarefa();
        }

    }
);
botaoAlternarTema.addEventListener(
    'click',
    () => {

>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        document.body.classList.toggle(
            'modo-escuro'
        );

<<<<<<< HEAD
        const modoEscuro =
            document.body.classList.contains('modo-escuro');

        localStorage.setItem(
            'modoEscuro',
            modoEscuro
        );

=======
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
        const iconeTema =
            botaoAlternarTema.querySelector('i');

        iconeTema.classList.toggle(
            'fa-moon'
        );

        iconeTema.classList.toggle(
            'fa-sun'
        );
<<<<<<< HEAD
    }
);

renderizarTarefas();
=======

    }
);
renderizarTarefas();
>>>>>>> bbb6147143bda04ea15a786a5b2c986a3c2d556f
