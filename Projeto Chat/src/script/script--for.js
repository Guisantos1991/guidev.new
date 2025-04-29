
function carregarContatos() {
    for (let posicao = 0; posicao < listaDeContatos.length; posicao++) {
      const contato = listaDeContatos[posicao];
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
  
      // Usando 'posicao' para criar um atraso variável (exemplo: 200ms multiplicado pela posição)
      setTimeout(() => {
        divContatosElement.appendChild(divParentElement);
      }, 200 * (posicao + 1));
    }
  }