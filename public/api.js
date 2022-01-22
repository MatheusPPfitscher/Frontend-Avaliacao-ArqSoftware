const api = axios.create({
    baseURL: "http://localhost:8081"
});

async function requestCreateUser(username, password) {
    try {
        const data = {
            username: username,
            password: password
        }
        const response = await api.post("/user", data)
        console.dir(response)
        return response.data
    }
    catch (error) {
        console.log(error.response);
        return error.response.data
    }
}

async function requestLogon(username, password) {
    try {
        const data = {
            username: username,
            password: password
        }
        const response = await api.post("/auth", data)
        return response.data;
    }
    catch (error) {
        return error.response.data
    }
}

async function requestCreateNote(token, title, details) {
    try {
        const data = {
            title,
            details
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.post("/note", data, config)
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}

async function requestViewNotes(token) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.get("/note", config)
        return response.data;
    }
    catch (error) {
        return error.response.data
    }
}

async function requestViewSingleNote(token, noteId) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.get(`/note/${noteId}`, config)
        return response.data;
    }
    catch (error) {
        return error.response.data
    }
}


async function requestEditNote(token, noteId, title, details) {
    try {
        const data = {
            title,
            details
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.put(`/note/${noteId}`, data, config)
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}

async function requestDeleteNote(token, noteId) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await api.delete(`/note/${noteId}`, config)
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}