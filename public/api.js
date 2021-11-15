const api = axios.create({
    baseURL: "https://api-avaliacao-matheuspp.herokuapp.com"
});

async function requestCriarUsuario(nome, senha) {
    try {
        const req = await api.post("/usuario", {
            data: {
                nome: nome,
                senha: senha
            }
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
            data: {
                nome: nome,
                senha: senha
            }
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
            data: {
                usuario: usuario,
            },
            headers: {
                Authorization: token
            }
        })
        return response.data.array;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestUmRecado(usuario, token, idRecado) {
    try {
        const response = await api.get(`/recado/${idRecado}`, {
            data: {
                usuario: usuario
            },
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
            data: {
                usuario: usuario,
                descricao: descricao,
                detalhamento: detalhamento
            },
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
            data: {
                usuario: usuario,
                descricao,
                detalhamento
            },
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
            data: {
                usuario: usuario
            },
            headers: {
                Authorization: token
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}