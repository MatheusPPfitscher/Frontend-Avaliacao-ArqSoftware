const api = axios.create({
    baseURL: ""
});

async function requestCriarUsuario(nome, senha) {
    try {
        const req = await api.post("/usuario", {
            nome: nome,
            senha: senha
        })
        return req.data.alerta
    }
    catch (error) {
        console.log(error);
        return "error"
    }
}

async function requestLogon(nome, senha) {
    try {
        const response = await api.post("/sessao", {
            nome: nome,
            senha: senha
        })
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestNewRecado() {

}
function logoff() { }

function criarRecado() { }

function editarRecado() { }

function excluirRecado() { }