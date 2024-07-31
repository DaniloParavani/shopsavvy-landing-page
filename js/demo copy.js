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

                            if (tabId == 'tab1' && productType == 'Bebidas') {
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
                                                <button type="button" class="btn btn-success add-to-cart" data-product="${item.id}">Adicionar</button>
                                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${item.id}">Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }

                            if (tabId == 'tab2' && productType == 'Carnes') {
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
                                                <button type="button" class="btn btn-success add-to-cart" data-product="${item.id}">Adicionar</button>
                                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${item.id}">Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }

                            if (tabId == 'tab3' && productType == 'Laticinios') {
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
                                                <button type="button" class="btn btn-success add-to-cart" data-product="${item.id}">Adicionar</button>
                                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${item.id}">Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }

                            if (tabId == 'tab4' && productType == 'Higiene') {
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
                                                <button type="button" class="btn btn-success add-to-cart" data-product="${item.id}">Adicionar</button>
                                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${item.id}">Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }

                            if (tabId == 'tab5' && productType == 'Frutas') {
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
                                                <button type="button" class="btn btn-success add-to-cart" data-product="${item.id}">Adicionar</button>
                                                <button type="button" class="btn btn-danger remove-from-cart" data-product="${item.id}">Remover</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        }
                    }

                    document.querySelector(`#${tabId} .card-deck`).innerHTML = content;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', function() {
                        const product = this.getAttribute('data-product');
                        const quantity = this.previousElementSibling.querySelector('input').value;
                        console.log(`Added ${quantity} of ${product} to cart.`);
                    });
                });

                document.querySelectorAll('.remove-from-cart').forEach(button => {
                    button.addEventListener('click', function() {
                        const product = this.getAttribute('data-product');
                        console.log(`Removed ${product} from cart.`);
                    });
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

    loadTabContent('tab1', './content/tab1.html');
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