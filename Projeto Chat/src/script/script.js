/**
 * Usando as pesquisas do QuerySelector, é possível localizar um item dentro do elemento com uma pesquisas completa. Por Exemplo:
 * IMPORTANTE, para a buscar por palavra, como vamos usar uma string dentro de outra, necessariamente o primeiro escopo é com aspas duplas.
 * const sendButton = document.querySelector("".cursor--pointer[src*='send']"") - Assim, a Query, vai procurar dentro dos elementos, qual deles especificamente possui a palavra pesquisada.
 * 
 * Para capturar o texto por exemplo, vamos usar o .value. Assim, ele vai lançar nas informações que desejamos os valores que preenchem o texto.
 * 
 * Sempre cuidar todos os movimentos e principalmente, observar quais os seletores estão ligados.
 * As consts vão ser usadas sequencialmente.
 * 
 * Quando for aplicar mais de uma classe, elas serão separadas por virgula. Assim, o JS espera uma array de objetos para a classe.
 * 
 * Para criação de movimentos, vamos alinhar scripts com css. Importante criar o keyframes no css e aplicar add e remove no css, fazendo com que o movimento de classes gere uma responsividade.
 * 
 * Ao criar elementos, como por exemplo, na criação de uma nova div, para perfomance, o idela é que a const de seleção, esteja fora da função, para evitar por exemplo
 * que sempre que o looping seja completado, ele selecione novamente o elemento. Causando uma perca de perfomance.
 * 
 * 
 * A mesma regra se aplica ao appendChild, o ideal é sempre nos movimentar ou alterar após a manipulação de dados pelo looping.
 * 
 */


document.addEventListener('DOMContentLoaded', () => {
    console.log('Minha página carregou');

    const inputMsg = document.querySelector('#inputMessage'); //Por se tratar de ID, vamos usar #
    console.log(inputMsg)

    inputMsg.placeholder = 'Digite aqui sua mensagem!'

    const buttons = document.querySelectorAll('.cursor--pointer')
    console.log(buttons)

    const sendButton = document.querySelector(".cursor--pointer[src*='send']");
    console.log(sendButton)

    const listaMensagens = document.querySelector(".div--messages");

    const listaDeContatos = [{
        id: 1,
        nome: 'Guilherme',
        ultimaMensagem: 'Olá, tudo bem?',
        horarioUltimaMensagem: '12:00',
        avatar: "./src/assets/images/david--moore.png",
        conversas: [ 
            {mensagem: 'Oi, eu sou o novo programdor', tipo: 'recebida', horario: '20:20'},
            {mensagem: 'Que legal, eu também sou', tipo: 'recebida', horario: '20:20'},
            { mensagem: 'Vamos codar juntos!', tipo: 'recebida', horario: '20:20'},
        ]
     },
     {
        id: 2,
        nome: 'Gabriel',
        ultimaMensagem: 'Tudo bem, e você?',
        horarioUltimaMensagem: '12:01',
        avatar: "./src/assets/images/david--moore.png",
        conversas: [
            {mensagem: 'Oi, eu sou o novo programdor', tipo: 'recebida', horario: '20:20'},
            {mensagem: 'Que legal, eu também sou', tipo: 'recebida', horario: '20:20'},
            { mensagem: 'Vamos codar juntos!', tipo: 'recebida', horario: '20:20'},
        ]
    },
    {
        id: 3,
        nome: 'João',
        ultimaMensagem: 'Você gosta de programar?',
        horarioUltimaMensagem: '17:00',
        avatar: "./src/assets/images/greg--james.png",
        conversas: [
            {mensagem: 'Oi, eu sou o novo programdor', tipo: 'recebida', horario: '20:20'},
            {mensagem: 'Que legal, eu também sou', tipo: 'recebida', horario: '20:20'},
            { mensagem: 'Vamos codar juntos!', tipo: 'recebida', horario: '20:20'},
        ]
    },
    {
        id: 4,
        nome: 'Maria',
        ultimaMensagem: 'O que você está fazendo?',
        horarioUltimaMensagem: '17:01',
        avatar: "./src/assets/images/emily--dorson.png",
        conversas: [
            {mensagem: 'Oi, eu sou o novo programdor', tipo: 'recebida', horario: '20:20'},
            {mensagem: 'Que legal, eu também sou', tipo: 'recebida', horario: '20:20'},
            { mensagem: 'Vamos codar juntos!', tipo: 'recebida', horario: '20:20'},
    }
    ]

    // sendButton.classList.add('nova--classe')
    const respostaParaOBot = [
        'Olá, tudo bem?',
        'Como você está?',
        'Qual o seu nome?',
        'Meu nome é O Novo Bot',
        'Eu faço o curso o Novo Programador',
        'Você quer conversar comigo?'
    ]



    function adicionarMensagem (tipoMensagem, texto) {
        const mensagemElement = document.createElement("div");

        mensagemElement.classList.add("message", "fade--in");
        
        if(tipoMensagem === 'enviada') {
            mensagemElement.classList.add("you")

        } else {
            mensagemElement.classList.add("other")

        }

        mensagemElement.innerText = texto;
        listaMensagens.appendChild(mensagemElement);

        setTimeout(() => {
            mensagemElement.classList.remove("fade--in")
        }, 500);

    }

    function enviarMensagem() {
        const texto = inputMsg.value.trim();
    
        if( texto === '') {
            alert('Sua mensagem está vazia!')
        } else {
            adicionarMensagem("enviada", texto);
            inputMsg.value = "";
        }

        setTimeout(responderMensagem, 2000)
    }

    function responderMensagem() {
        const posicao = Math.floor(Math.random() * respostaParaOBot.length);
        const mensagemDoBot = respostaParaOBot[posicao];
        adicionarMensagem('recebida', mensagemDoBot)
    }
    
    
    sendButton.addEventListener('click', () => enviarMensagem())
    inputMsg.addEventListener('keypress', () => {
        if (event.key === "Enter") {
            enviarMensagem();
        }
    } )

    const divContatosElement = document.querySelector('.div--contacts');

    function carregarContatos () {

        listaDeContatos.forEach((contato) => {

        const divParentElement = document.createElement('div');
        divParentElement.classList.add('flex', 'flex--direction--row', 'area--contact', 'fade--in');
        

        divParentElement.innerHTML = `
                            
                        <div class="flex align--items--center justify--content--center flex--1">
                            <img class="avatar--left--bar" src="${contato.avatar}" alt="Avatar do contato" />
                        </div>

                        <div class="flex flex--3 flex--direction--column justify--content--center">
                               <div class="flex align--items--center infos--contact">
                                <div class="font-family font-weight">${contato.nome}</div>
                                    <img src="./src/assets/icons/verified.svg"/>
                                </div> 
                                <div class="last--message">${contato.ultimaMensagem}</div>
                        </div>
                                <div class="flex flex--direction--column align--items--end justify--content--center flex--1 div--last--messages--info">
                                    <div class="hour--last--message">${contato.horarioUltimaMensagem}</div>
                                    <div class="quantity--not--viewed--message flex align--items--center justify--content--center background--green">1</div>

                                </div>
        `;

        
        setTimeout(() => {
            divContatosElement.appendChild(divParentElement);
        }, 500);

        })
        
       
        
    }
    carregarContatos();

    
})


