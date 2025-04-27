function atualizarUsername() {
    const input = document.getElementById('username');
    const nomeDigitado = input.value;
    const topUsername = document.getElementById('topUsername');
    topUsername.textContent = nomeDigitado;
  }
  