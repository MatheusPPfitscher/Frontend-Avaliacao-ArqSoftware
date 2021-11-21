const api = axios.create({
    baseURL: "http://localhost:8082"
});

async function requestCriarUsuario(usuario, senha) {
    try {
        const response = await api.post("/usuario", {
            usuario: usuario,
            senha: senha
        })
        return response.data.alerta
    }
    catch (error) {
        console.log(error);
        return "error"
    }
}

async function requestLogon(usuario, senha) {
    try {
        const response = await api.post("/sessao", {
            usuario: usuario,
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
            params: { usuario: usuario },
            headers: {
                Authorization: token
            }
        })
        console.log("Todos Recados " + JSON.stringify(response.data));
        return response.data.array;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestUmRecado(usuario, token, idRecado) {
    try {
        const response = await api.get(`/recado/${idRecado}`, {
            params: { usuario: usuario },
            headers: {
                Authorization: token
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
            usuario: usuario,
            descricao: descricao,
            detalhamento: detalhamento,
            headers: {
                Authorization: token
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function requestEditarRecado(usuario, token, idRecado, descricao, detalhamento) {
    try {
        const response = await api.put(`/recado/${idRecado}`, {
            usuario: usuario,
            descricao,
            detalhamento,
            headers: {
                Authorization: token
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function requestDeletarRecado(usuario, token, idRecado) {
    try {
        const response = await api.delete(`/recado/${idRecado}`, {
            usuario: usuario,
            headers: {
                Authorization: token
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}