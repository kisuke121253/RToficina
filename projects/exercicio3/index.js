let items = [];

function addItem() {
    const client = document.getElementById('client-input').value;
    const product = document.getElementById('product-input').value;
    const price = parseFloat(document.getElementById('price-input').value);

    if (client && product && price) {
        items.push({ client, product, price });

        const itemList = document.getElementById('item-list');
        const listItem = document.createElement('li');
        listItem.innerText = `${client} - ${product} (R$ ${price.toFixed(2)})`;
        itemList.appendChild(listItem);

        document.getElementById('client-input').value = '';
        document.getElementById('product-input').value = '';
        document.getElementById('price-input').value = '';
    }
}

function calculateBill() {
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';

    const clients = {};
    let totalBill = 0;

    for (let i = 0; i < items.length; i++) {
        const { client, product, price } = items[i];

        if (!clients[client]) {
            clients[client] = 0;
        }

        clients[client] += price;
        totalBill += price;
    }

    const perPersonBill = {};

    for (const client in clients) {
        const clientTotal = clients[client];
        const clientBill = clientTotal + clientTotal * 0.1; // Adiciona 10% de taxa de serviço

        perPersonBill[client] = clientBill;

        const listItem = document.createElement('li');
        listItem.innerText = `${client}: R$ ${clientBill.toFixed(2)}`;
        resultList.appendChild(listItem);
    }

    const serviceCharge = (totalBill * 0.1) / Object.keys(clients).length;

    for (const client in perPersonBill) {
        perPersonBill[client] -= serviceCharge;

        const listItem = document.createElement('li');
        listItem.innerText = `(${client}): R$ ${perPersonBill[client].toFixed(2)}`;
        resultList.appendChild(listItem);
    }

    items = [];
}