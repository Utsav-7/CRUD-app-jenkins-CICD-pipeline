let products = [];
let currentIndex = -1;

document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addProduct();
});

function addProduct() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    if (currentIndex === -1) {
        products.push({ name, price, quantity });
    } else {
        products[currentIndex] = { name, price, quantity };
        currentIndex = -1;
    }
    renderProducts();
    clearForm();
}

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;
    let totalQuantity = 0;

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
        totalItems++;
        totalPrice += product.price;
        totalQuantity += product.quantity;
    });

    document.getElementById('totalsRow').innerHTML = `
        Total Items: ${totalItems} | Total Price: ${totalPrice.toFixed(2)} | Total Quantity: ${totalQuantity}
    `;
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

function editProduct(index) {
    const product = products[index];
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;
    currentIndex = index;
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

function updateProduct() {
    addProduct();
}


function printBill() {
    let billContent = `
        <h1>Bill</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalPrice = 0;
    products.forEach(product => {
        const productTotal = product.price * product.quantity;
        billContent += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${productTotal.toFixed(2)}</td>
            </tr>
        `;
        totalPrice += productTotal;
    });

    billContent += `
            </tbody>
        </table>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    `;

    const billWindow = window.open('', '', 'width=800,height=600');
    billWindow.document.write('<html><head><title>Bill</title></head><body>');
    billWindow.document.write(billContent);
    billWindow.document.write('</body></html>');
    billWindow.document.close();
    billWindow.print();
}