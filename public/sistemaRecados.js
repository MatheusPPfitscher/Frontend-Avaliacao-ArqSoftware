function displayAlertaPagina(alerta) {
    let campoAlertaSenha = document.getElementById("alertaSenha")
    let campoAlertaUsuario = document.getElementById("alertaUsuario")
    let campoAlertaUsuarioSenha = document.getElementById("alertaUsuarioSenha")
    if (alerta == "vazio") {
        campoAlertaUsuario.innerHTML = "O usuário não pode estar vazio."
    }
    else if (alerta == "usuarioExiste") {
        campoAlertaUsuario.innerHTML = "Este usuário já existe."
    }
    else if (alerta == "confiraSenha") {
        campoAlertaSenha.innerHTML = "As senhas não conferem."
    }
    else if (alerta == "criado") {
        alert("Usuário criado com sucesso.")
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    else if (alerta == "reset") {
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    else if (alerta == "usuarioIncorreto") {
        campoAlertaUsuarioSenha.innerHTML = "Este usuário não existe."
    }
    else if (alerta == "senhaIncorreta") {
        campoAlertaUsuarioSenha.innerHTML = "A senha está incorreta."
    }
    else console.log(alerta)
}


async function criarUsuario() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let campoRepeteSenha = document.getElementById("campoRepeteSenha").value
    displayAlertaPagina("reset")
    if (campoSenha != campoRepeteSenha) {
        displayAlertaPagina("confiraSenha")
    } else {
        let alerta = await requestCriarUsuario(campoUsuario, campoSenha)
        displayAlertaPagina(alerta)
        if (alerta == "criado") window.location.href = "./entrada.html";
    }

}

async function logon() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let resposta = await requestLogon(campoUsuario, campoSenha);
    if (resposta.msg == "sucesso") {
        sessionStorage.setItem("token", resposta.token)
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

async function criarRecado() {
    let descricao = document.getElementById("campoDescricaoEntrada").value
    let detalhamento = document.getElementById("campoDetalhamentoEntrada").value
    let tokenSessao = sessionStorage.getItem("token")
    if (descricao != "") {
        await requestCriarRecado(tokenSessao, descricao, detalhamento)
        geraListaRecados()
    }
}

async function geraListaRecados() {
    let tokenSessao = sessionStorage.getItem("token")
    let tableBody = document.getElementById("listaRecados")
    let conteudoTableBody = ""
    let arrayRecados = await requestTodosRecados(tokenSessao)
    for (let id in arrayRecados) {
        let conteudoLinha = `<tr>
        <th scope="row">${id}</th>
        <td class="col-2">${arrayRecados[id].descricao}</td>
        <td class="col-8">
            ${arrayRecados[id].detalhamento}</td>
        <td class="col-2">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar"
                onclick="gerarModalEdicao(${id})">Editar</button>
            <button class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#modalExcluir" onclick="gerarModalExclusao(${id})">Excluir</button>
        </td>
    </tr>`
        conteudoTableBody += conteudoLinha
    }
    tableBody.innerHTML = conteudoTableBody
}

async function gerarModalEdicao(idRecadoEditar) {
    let tokenSessao = sessionStorage.getItem("token")
    let modalEdicao = document.getElementById('modalEditar')
    let recado = await requestUmRecado(tokenSessao, idRecadoEditar)
    modalEdicao.setAttribute("data-bs-idRecado", idRecadoEditar)
    let modalCampoDescricao = document.getElementById("modalEditarDescricaoRecado")
    modalCampoDescricao.value = recado.descricao
    let modalCampoDetalhamento = document.getElementById("modalEditarDetalhamentoRecado")
    modalCampoDetalhamento.value = recado.detalhamento
}

async function gerarModalExclusao(idRecadoExcluir) {
    let tokenSessao = sessionStorage.getItem("token")
    let modalExclusao = document.getElementById('modalExcluir')
    let recado = await requestUmRecado(tokenSessao, idRecadoExcluir)
    modalExclusao.setAttribute("data-bs-idRecado", idRecadoExcluir)
    let modalCampoDescricao = document.getElementById("modalExcluirDescricaoRecado")
    modalCampoDescricao.innerHTML = recado.descricao
    let modalCampoDetalhamento = document.getElementById("modalExcluirDetalhamentoRecado")
    modalCampoDetalhamento.innerHTML = recado.detalhamento
}

async function salvarModalEditar() {
    let tokenSessao = sessionStorage.getItem("token")
    let modalEditar = document.getElementById('modalEditar')
    let valorDescricaoModal = document.getElementById("modalEditarDescricaoRecado").value
    let valorDetalhamentoModal = document.getElementById("modalEditarDetalhamentoRecado").value
    let idRecadoEditar = modalEditar.getAttribute("data-bs-idRecado")
    await requestEditarRecado(tokenSessao, idRecadoEditar, valorDescricaoModal, valorDetalhamentoModal)
    geraListaRecados()
}

async function salvarModalExcluir() {
    let tokenSessao = sessionStorage.getItem("token")
    var modalExcluir = document.getElementById('modalExcluir')
    let idRecadoExcluir = modalExcluir.getAttribute("data-bs-idRecado")
    await requestDeletarRecado(tokenSessao, idRecadoExcluir)
    geraListaRecados()
}


function iniciaSistemaRecados() {
    let tokenSessao = sessionStorage.getItem("token")
    if (document.title == "Sistema de Recados") {
        if ((tokenSessao != null)) {
            geraListaRecados()
        }
        else {
            window.location.href = "./entrada.html";
        }
    }
}

window.onload = iniciaSistemaRecados()