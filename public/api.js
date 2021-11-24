const api = axios.create({
    baseURL: "https://api-recados-matheuspp.herokuapp.com/"
});

async function requestCriarUsuario(usuario, senha) {
    try {
        const data = {
            usuario: usuario,
            senha: senha
        }
        const response = await api.post("/usuario", data)
        return response.data.alerta
    }
    catch (error) {
        console.log(error);
        return "error"
    }
}

async function requestLogon(usuario, senha) {
    try {
        const data = {
            usuario: usuario,
            senha: senha
        }
        const response = await api.post("/sessao", data)
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestLogoff(token) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.delete("/sessao", config)
    }
    catch (error) {
        console.log(error);
    }
}
async function requestTodosRecados(token) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.get("/recado", config)
        console.log("Todos Recados " + JSON.stringify(response.data));
        return response.data.array;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestUmRecado(token, idRecado) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.get(`/recado/${idRecado}`, config)
        return response.data.recado;
    }
    catch (error) {
        console.log(error);
    }
}

async function requestCriarRecado(token, descricao, detalhamento) {
    try {
        const data = {
            descricao: descricao,
            detalhamento: detalhamento
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.post("/recado", data, config)
    }
    catch (error) {
        console.log(error);
    }
}

async function requestEditarRecado(token, idRecado, descricao, detalhamento) {
    try {
        const data = {
            descricao,
            detalhamento
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.put(`/recado/${idRecado}`, data, config)
    }
    catch (error) {
        console.log(error);
    }
}

async function requestDeletarRecado(token, idRecado) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.delete(`/recado/${idRecado}`, config)
    }
    catch (error) {
        console.log(error);
    }
}