let authToken = localStorage.getItem('token') || '';

async function fetchTools() {
    try {
        const res = await fetch('/api/tools');
        const tools = await res.json();
        const container = document.getElementById('tools-container');
        container.innerHTML = '';

        if (tools.length === 0) {
            container.innerHTML = '<p>No tools available in the database inventory yet.</p>';
            return;
        }

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3>${tool.name}</h3>
                <p><strong>Brand:</strong> ${tool.brand} | <strong>Category:</strong> ${tool.category}</p>
                <p><strong>Price:</strong> $${tool.price}</p>
                <p><strong>Available Stock:</strong> ${tool.stock_quantity}</p>
                <button onclick="buyTool(${tool.id})">Purchase Item</button>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error connecting to endpoints:", err);
    }
}

async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if(data.token) {
        authToken = data.token;
        localStorage.setItem('token', data.token);
        document.getElementById('auth-status').innerHTML = `<span>Logged in successfully Securely</span>`;
    } else {
        alert(data.error || "Login Verification Fault");
    }
}

async function buyTool(toolId) {
    if (!authToken) return alert("Please authenticate to make system purchases.");

    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ toolId, quantity: 1 })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchTools();
}

// Initial pull on runtime
fetchTools();
