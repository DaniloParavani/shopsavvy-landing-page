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
                                if (tabId === 'tab1' && productType === 'Bebidas' ||
                                    tabId === 'tab2' && productType === 'Carnes' ||
                                    tabId === 'tab3' && productType === 'Laticinios' ||
                                    tabId === 'tab4' && productType === 'Higiene' ||
                                    tabId === 'tab5' && productType === 'Frutas') {
                                    content += `
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
                                console.log(`Added ${quantity} of ${productId} to cart.`);

                                addToCart(productId, quantity, productName, productBrand);
                            });
                        });

                        document.querySelectorAll('.remove-from-cart').forEach(button => {
                            button.addEventListener('click', function() {
                                const productId = this.getAttribute('data-product');
                                console.log(`Removed ${productId} from cart.`);
                                removeFromCart(productId);
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

    function addToCart(productId, quantity, productName, productBrand) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity);
        } else {
            cart.push({ id: productId, name: productName, brand: productBrand, quantity: parseInt(quantity) });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTab();
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTab();
    }

    function updateCartTab() {
        const cartTab = document.querySelector('#tab6 .card-deck');
        console.log(cartTab)
        if (cartTab) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            let content = '';

            cart.forEach(item => {
                const product = getProductById(item.id);
                content += `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.nome}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${product.nome}</h5>
                            <h7 class="card-title">${product.marca}</h7>
                            <p class="card-text">${product.preço}</p>
                            <div class="quantity">
                                <label for="quantity${product.id}">Quantidade:</label>
                                <input type="number" id="quantity${product.id}" name="quantity${product.id}" min="1" value="${item.quantity}" class="form-control">
                            </div>
                            <div class="btn-group mt-3" role="group">
                                <button type="button" class="btn btn-success update-cart" data-product="${product.id}">Atualizar</button>
                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${product.id}">Remover</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartTab.innerHTML = content;

            document.querySelectorAll('.update-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product');
                    const quantity = this.parentElement.parentElement.querySelector('input').value;
                    console.log(`Updated ${productId} quantity to ${quantity}.`);
                    addToCart(productId, quantity, productName, productBrand);
                });
            });

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product');
                    console.log(`Removed ${productId} from cart.`);
                    removeFromCart(productId);
                });
            });
        }
    }

    function getProductById(productId) {
        const data = JSON.parse(localStorage.getItem('products'));
        for (let category in data.produtos) {
            const products = data.produtos[category];
            for (let product of products) {
                if (product.id === productId) {
                    return product;
                }
            }
        }
        return null;
    }

    loadTabContent('tab1', './content/tab1.html');

    DarkReader.setFetchMethod(window.fetch);
    DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10
    });

    if (localStorage.getItem('darkmode') === 'enabled') {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });
    } else {
        DarkReader.disable();
    }

    updateCartTab();

    window.addEventListener('beforeunload', function() {
        localStorage.clear();
    });
});