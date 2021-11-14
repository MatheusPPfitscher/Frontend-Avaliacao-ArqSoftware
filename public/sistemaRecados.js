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
        sessionStorage.setItem("usuario", campoUsuario)
        sessionStorage.setItem("token", token)
        window.location.href = "./gerenciador.html";
    } else if (resposta.msg == "senhaIncorreta") {
        displayAlertaPagina("senhaIncorreta")
    }
    else if (resposta.msg == "usuarioIncorreto") {
        displayAlertaPagina("usuarioIncorreto")
    }
}

function logoff() {
    sessionStorage.removeItem("token")
    window.location.href = "./entrada.html";
}

function criarRecado() { }

function editarRecado() { }

function excluirRecado() { }

function geraListaRecados(usuarioAtual, tokenSessao) {
    let tableBody = document.getElementById("listaRecados")
    let conteudoTableBody = ""
    let arrayRecados = requestTodosRecados(usuarioAtual, tokenSessao)
    for (let id in arrayRecados) {
        let conteudoLinha = `<tr>
        <th scope="row">${id}</th>
        <td class="col-2">${arrayRecados[id].descricao}</td>
        <td class="col-8">
            ${arrayRecados[id].detalhamento}</td>
        <td class="col-2">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar"
                onclick="gerarModalEdicao('${usuarioAtual.username}', ${id})">Editar</button>
            <button class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#modalExcluir" onclick="gerarModalExclusao('${usuarioAtual.username}',${id})">Excluir</button>
        </td>
    </tr>`
        conteudoTableBody += conteudoLinha
    }
    tableBody.innerHTML = conteudoTableBody
}

function iniciaSistemaRecados() {
    let usuarioSessao = sessionStorage.getItem("usuario")
    let tokenSessao = sessionStorage.getItem("token")
    if ((usuarioSessao != null && tokenSessao != null)) {
        geraListaRecados(usuarioSessao, tokenSessao)
    }
    else {
        window.location.href = "./entrada.html";
    }
}

window.onload = iniciaSistemaRecados()