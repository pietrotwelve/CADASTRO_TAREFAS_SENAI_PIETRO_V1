const campoTarefa = document.getElementById('campo-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botaoAlternarTema = document.getElementById('botao-alternar-tema');
const botoesFiltro = document.querySelectorAll('.filtro');

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

            salvarTarefas();

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
            tarefa.concluida = !tarefa.concluida;

            salvarTarefas();

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
            tarefas = tarefas.filter(
                item => item !== tarefa
            );

            salvarTarefas();

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
    const textoTarefa = campoTarefa.value.trim();

    if (!textoTarefa) {
        alert('Por favor, digite uma tarefa!');

        campoTarefa.focus();

        return;
    }

    tarefas.push({
        texto: textoTarefa.slice(0, 40),
        concluida: false
    });

    salvarTarefas();

    campoTarefa.value = '';

    filtroAtual = 'todas';

    botoesFiltro.forEach(botao => {
        botao.classList.toggle(
            'ativo',
            botao.dataset.filtro === filtroAtual
        );
    });

    renderizarTarefas();

    campoTarefa.focus();
}

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(item => {
            item.classList.toggle(
                'ativo',
                item === botao
            );
        });

        renderizarTarefas();
    });
});

botaoAdicionar.addEventListener(
    'click',
    adicionarTarefa
);

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
        document.body.classList.toggle(
            'modo-escuro'
        );

        const modoEscuro =
            document.body.classList.contains('modo-escuro');

        localStorage.setItem(
            'modoEscuro',
            modoEscuro
        );

        const iconeTema =
            botaoAlternarTema.querySelector('i');

        iconeTema.classList.toggle(
            'fa-moon'
        );

        iconeTema.classList.toggle(
            'fa-sun'
        );
    }
);
renderizarTarefas();
