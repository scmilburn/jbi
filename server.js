const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/api/part_details', async (req, res) => {
    const partNumber = req.query.part_number;

    try {
        const response = await axios.get(`https://www.jbi.bike/site/product_details.php?part_number=${partNumber}`, {
            withCredentials: true,
            headers: {
                'Set-Cookie': 'jbi_cookie=MjEzNzF8MTcyMTM0MTA2NHwxMDgwODM%3D; expires=Thu, 18-Jul-2024 22:17:44 GMT; Max-Age=1209600; path=/; HttpOnly'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
