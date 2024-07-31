document.addEventListener('DOMContentLoaded', function() {
    function loadTabContent(tabId, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(`#${tabId}`).innerHTML = data;

                getProducts()
                    .then(data => {
                        let content = '';

                        for (let productType in data.produtos) {
                            let products = data.produtos[productType];

                            for (let i = 0; i < products.length; i++) {
                                let item = products[i];

                                if (tabId === 'tab1' && productType === 'Bebidas') {
                                    content += createCard(item);
                                }

                                if (tabId === 'tab2' && productType === 'Carnes') {
                                    content += createCard(item);
                                }

                                if (tabId === 'tab3' && productType === 'Laticinios') {
                                    content += createCard(item);
                                }

                                if (tabId === 'tab4' && productType === 'Higiene') {
                                    content += createCard(item);
                                }

                                if (tabId === 'tab5' && productType === 'Frutas') {
                                    content += createCard(item);
                                }
                            }
                        }

                        document.querySelector(`#${tabId} .card-deck`).innerHTML = content;

                        document.querySelectorAll('.add-to-cart').forEach(button => {
                            button.addEventListener('click', function() {
                                const cardBody = this.closest('.card-body');
                                const quantityInput = cardBody.querySelector('.quantity input');
                                const quantity = quantityInput ? quantityInput.value : 1;
                                const productId = this.getAttribute('data-product-id');
                                const productName = this.getAttribute('data-product-name');
                                const productBrand = this.getAttribute('data-product-brand');
                                console.log(`Added ${quantity} of ${productName} to cart.`);

                                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                                const productIndex = cart.findIndex(product => product.id === productId);
                        
                                if (productIndex !== -1) {
                                    cart[productIndex].quantity = parseInt(cart[productIndex].quantity) + parseInt(quantity);
                                } else {
                                    cart.push({ id: productId, name: productName, brand: productBrand, quantity: parseInt(quantity) });
                                }
                        
                                localStorage.setItem('cart', JSON.stringify(cart));
                            });
                        });
                        
                        document.querySelectorAll('.remove-from-cart').forEach(button => {
                            button.addEventListener('click', function() {
                                const productId = this.getAttribute('data-product-id');
                                console.log(`Removed ${productId} from cart.`);
                        
                                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                                cart = cart.filter(product => product.id !== productId);
                                localStorage.setItem('cart', JSON.stringify(cart));
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch(error => {
                console.error('Error loading tab content:', error);
                document.querySelector(`#${tabId}`).innerHTML = 'Failed to load content';
            });
    }

    function createCard(item) {
        return `
            <div class="card">
                <img src="${item.image}" class="card-img-top product-image" alt="${item.nome}">
                <div class="card-body text-center">
                    <h5 class="card-title">${item.nome}</h5>
                    <h7 class="card-title">${item.marca}</h7>
                    <p class="card-text">${item.preço}</p>
                    <div class="quantity">
                        <label for="quantity${item.id}">Quantidade:</label>
                        <input type="number" id="quantity${item.id}" name="quantity${item.id}" min="1" value="1" class="form-control">
                    </div>
                    <div class="btn-group mt-3" role="group">
                        <button type="button" class="btn btn-success add-to-cart" data-product-id="${item.id}" data-product-name="${item.nome}" data-product-brand="${item.marca}">Adicionar</button>
                        <button type="button" class="btn btn-danger remove-from-cart" data-product-id="${item.id}">Remover</button>
                    </div>
                </div>
            </div>
        `;
    }

    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            const targetTabId = event.target.getAttribute('aria-controls');
            loadTabContent(targetTabId, `./content/${targetTabId}.html`);
        });
    });

    async function getProducts() {
        try {
            const response = await fetch("/products.json");
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
    
    loadTabContent('tab1', './content/tab1.html');
    
    document.querySelector('#cart-tab').addEventListener('shown.bs.tab', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartContent = '';
    
        if (cart.length === 0) {
            cartContent = 'Lista de Compras Vazia';
        } else {
            cart.forEach(item => {
                cartContent += `
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">${item.name}</h5>
                            <h7 class="card-title">${item.brand}</h7>
                            <p class="card-text">Quantidade: ${item.quantity}</p>
                        </div>
                    </div>
                `;
            });
        }
    
        document.querySelector('#cart').innerHTML = cartContent;
    });
});

DarkReader.setFetchMethod(window.fetch);
DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10
});

window.addEventListener('load', function() {
    if (localStorage.getItem('darkmode') === 'enabled') {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });
    } else {
        DarkReader.disable();
    }
});