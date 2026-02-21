const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// A URL da sua API original (HTTP sem SSL)
const TARGET_API_BASE_URL = "http://zeroum.blog/player_api.php";

// Habilita CORS para permitir requisições do seu frontend
// Em produção, você pode querer restringir o origin para o seu domínio
app.use(cors());

// Rota do proxy: todas as requisições para /api/proxy serão redirecionadas
app.all("/api/proxy", async (req, res) => {
    try {
        // Constrói a URL completa para a API externa, incluindo os parâmetros da requisição original
        // req.query contém os parâmetros da URL (ex: ?username=ApiLiberadaUsers&password=69576xAo9H)
        const params = new URLSearchParams(req.query).toString();
        const fullTargetUrl = `${TARGET_API_BASE_URL}?${params}`;

        // Faz a requisição para a API externa
        const apiResponse = await axios({
            method: req.method, // Usa o mesmo método da requisição original (GET, POST, etc.)
            url: fullTargetUrl,
            headers: { ...req.headers, host: new URL(TARGET_API_BASE_URL).host }, // Mantém cabeçalhos, mas ajusta o host
            data: req.body // Envia o corpo da requisição original, se houver
        });

        // Retorna a resposta da API externa para o cliente
        res.status(apiResponse.status).send(apiResponse.data);
    } catch (error) {
        console.error("Erro ao chamar a API externa:", error.message);
        // Tenta retornar um erro mais específico se for um erro de resposta da API
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).json({ error: "Erro ao buscar dados da API externa." });
        }
    }
});

// Para Vercel Serverless Functions, a função é exportada
module.exports = app;

