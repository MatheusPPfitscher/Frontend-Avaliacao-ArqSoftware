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

async function requestTodosRecados(usuario, token) {
    try {
        const response = await api.get("/recado", {
            usuario: usuario,
            token: token
        })
        return response.data.array;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestUmRecado(usuario, token, idRecado) {
    try {
        const response = await api.get("/recado", {
            usuario: usuario,
            token: token,
            params: {
                id: idRecado
            }
        })
        return response.data.recado;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestCriarRecado(usuario, token, descricao, detalhamento) {
    try {
        const response = await api.post("/recado", {
            usuario,
            token,
            descricao,
            detalhamento
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function requestEditarRecado() {

}