function displayAlertaPagina(alerta) {
    let campoAlertaSenha = document.getElementById("alertaSenha")
    let campoAlertaUsuario = document.getElementById("alertaUsuario")
    let campoAlertaUsuarioSenha = document.getElementById("alertaUsuarioSenha")

    if (alerta == "vazio") {
        campoAlertaUsuario.innerHTML = "O usuário não pode estar vazio."
    }
    if (alerta == "usuarioExiste") {
        campoAlertaUsuario.innerHTML = "Este usuário já existe."
    }
    if (alerta == "confiraSenha") {
        campoAlertaSenha.innerHTML = "As senhas não conferem."
    }
    if (alerta == "criado") {
        alert("Usuário criado com sucesso.")
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    if (alerta == "reset") {
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    if (alerta == "usuarioIncorreto") {
        campoAlertaUsuarioSenha.innerHTML = "Este usuário não existe."
    }
    if (alerta == "senhaIncorreta") {
        campoAlertaUsuarioSenha.innerHTML = "A senha está incorreta."
    }
    if (alerta == "erro") {
        alert("Erro de comunicação com a API.")
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
}

async function criarUsuario() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let campoRepeteSenha = document.getElementById("campoRepeteSenha").value
    displayAlertaPagina("reset")
    if (campoSenha != campoRepeteSenha) {
        displayAlertaPagina("confiraSenha")
    } else {
        let alerta = requestCriarUsuario(campoUsuario, campoSenha)
        displayAlertaPagina(alerta)
        if (alerta == "criado") window.location.href = "./entrada.html";
    }

}

async function logon() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let resposta = requestLogon(campoUsuario, campoSenha)
    if (resposta.msg == "sucesso") {
        sessionStorage['token'] = resposta.token;
        window.location.href = "./gerenciador.html";
    } else if (resposta.msg == "senhaIncorreta") {

    }
    else if (resposta.msg == "usuarioIncorreto") {

    }
}

function logoff() { }

function criarRecado() { }

function editarRecado() { }

function excluirRecado() { }