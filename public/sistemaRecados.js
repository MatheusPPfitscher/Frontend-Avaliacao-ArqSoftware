function setPageMessage(messageType) {
    let campoAlertaSenha = document.getElementById("alertaSenha")
    let campoAlertaUsuario = document.getElementById("alertaUsuario")
    let campoAlertaUsuarioSenha = document.getElementById("alertaUsuarioSenha")
    if (messageType == "EmptyUsername") {
        campoAlertaUsuario.innerHTML = "O usuário não pode estar vazio."
    }
    else if (messageType == "UsernameUnavailable") {
        campoAlertaUsuario.innerHTML = "Este usuário já existe."
    }
    else if (messageType == "PasswordMismatch") {
        campoAlertaSenha.innerHTML = "As senhas não conferem."
    }
    else if (messageType == "UserCreated") {
        alert("Usuário criado com sucesso.")
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    else if (messageType == "reset") {
        campoAlertaSenha.innerHTML = ""
        campoAlertaUsuario.innerHTML = ""
    }
    else if (messageType == "invalidLogin") {
        campoAlertaUsuarioSenha.innerHTML = "Usuário ou senha estão incorretos."
    }
    else console.log(messageType)
}

async function createUser() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let campoRepeteSenha = document.getElementById("campoRepeteSenha").value
    setPageMessage("reset")
    if (campoSenha !== campoRepeteSenha) {
        setPageMessage("PasswordMismatch")
    } else {
        let requestResult = await requestCreateUser(campoUsuario, campoSenha)
        setPageMessage(requestResult.msg)
        if (requestResult.msg === "UserCreated") window.location.href = "./index.html";
    }

}

async function logon() {
    let campoUsuario = document.getElementById("campoUsuario").value
    let campoSenha = document.getElementById("campoSenha").value
    let requestResult = await requestLogon(campoUsuario, campoSenha);
    if (requestResult.msg === "Logon") {
        sessionStorage.setItem("token", requestResult.token)
        window.location.href = "./gerenciador.html";
    } else if (requestResult.msg === "invalidLogin") {
        setPageMessage("invalidLogin");
    }
}

function logoff() {
    sessionStorage.removeItem("token")
    window.location.href = "./index.html";
}

function verifyExpiredLogon(errorMsg) {
    if (errorMsg === "ExpiredToken") {
        sessionStorage.removeItem("token")
        alert("Sessão expirada, faça logon novamente.")
        window.location.href = "./index.html";
        return true;
    }
    return false
}

async function createNote() {
    let title = document.getElementById("campoDescricaoEntrada").value
    let details = document.getElementById("campoDetalhamentoEntrada").value
    let tokenSessao = sessionStorage.getItem("token")
    if (title !== "") {
        let result = await requestCreateNote(tokenSessao, title, details)
        if (verifyExpiredLogon(result.msg)) return;
        loadNotesView()
    }
}

async function loadNotesView() {
    let tokenSessao = sessionStorage.getItem("token")
    let tableBody = document.getElementById("listaRecados")
    let conteudoTableBody = ""
    let result = await requestViewNotes(tokenSessao)
    if (verifyExpiredLogon(result.msg)) return;
    let notesArray = result.data
    for (let id in notesArray) {
        let conteudoLinha = `<tr>
        <th scope="row">${id}</th>
        <td class="col-2">${notesArray[id].title}</td>
        <td class="col-8">
            ${notesArray[id].details}</td>
        <td class="col-2">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar"
                onclick="loadEditionModal('${notesArray[id].uid}')">Editar</button>
            <button class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#modalExcluir" onclick="loadDeletionModal('${notesArray[id].uid}')">Excluir</button>
        </td>
    </tr>`
        conteudoTableBody += conteudoLinha
    }
    tableBody.innerHTML = conteudoTableBody
}

async function loadEditionModal(idRecadoEditar) {
    let tokenSessao = sessionStorage.getItem("token")
    let modalEdicao = document.getElementById('modalEditar')
    let result = await requestViewSingleNote(tokenSessao, idRecadoEditar)
    console.log(result)
    if (verifyExpiredLogon(result.msg)) return;
    let recado = result.data[0]
    modalEdicao.setAttribute("data-bs-idRecado", idRecadoEditar)
    let modalCampoDescricao = document.getElementById("modalEditarDescricaoRecado")
    modalCampoDescricao.value = recado.title
    let modalCampoDetalhamento = document.getElementById("modalEditarDetalhamentoRecado")
    modalCampoDetalhamento.value = recado.details
}

async function loadDeletionModal(idRecadoExcluir) {
    let tokenSessao = sessionStorage.getItem("token")
    let modalExclusao = document.getElementById('modalExcluir')
    let result = await requestViewSingleNote(tokenSessao, idRecadoExcluir)
    if (verifyExpiredLogon(result.msg)) return;
    let recado = result.data[0]
    modalExclusao.setAttribute("data-bs-idRecado", idRecadoExcluir)
    let modalCampoDescricao = document.getElementById("modalExcluirDescricaoRecado")
    modalCampoDescricao.innerHTML = recado.title
    let modalCampoDetalhamento = document.getElementById("modalExcluirDetalhamentoRecado")
    modalCampoDetalhamento.innerHTML = recado.details
}

async function saveEditionModal() {
    let tokenSessao = sessionStorage.getItem("token")
    let modalEditar = document.getElementById('modalEditar')
    let valorDescricaoModal = document.getElementById("modalEditarDescricaoRecado").value
    let valorDetalhamentoModal = document.getElementById("modalEditarDetalhamentoRecado").value
    let idRecadoEditar = modalEditar.getAttribute("data-bs-idRecado")
    let result = await requestEditNote(tokenSessao, idRecadoEditar, valorDescricaoModal, valorDetalhamentoModal)
    if (verifyExpiredLogon(result.msg)) return;
    loadNotesView()
}

async function saveDeletionModal() {
    let tokenSessao = sessionStorage.getItem("token")
    var modalExcluir = document.getElementById('modalExcluir')
    let idRecadoExcluir = modalExcluir.getAttribute("data-bs-idRecado")
    await requestDeleteNote(tokenSessao, idRecadoExcluir)
    loadNotesView()
}

function loadInstance() {
    let tokenSessao = sessionStorage.getItem("token")
    if (document.title == "Sistema de Recados") {
        if ((tokenSessao != null)) {
            loadNotesView()
        }
        else {
            window.location.href = "./index.html";
        }
    }
}

window.onload = loadInstance()