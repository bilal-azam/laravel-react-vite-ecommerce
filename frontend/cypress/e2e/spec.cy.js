describe('Navigation tests', () => {
    it('Clicks on a specific navigation item and waits for loading to complete', () => {
        cy.visit('/');

        cy.get('[data-test=navigation]').within(() => {
            cy.contains('[data-test="navigation"]', 'Products');
        });
    });
    it('Visits /products and waits for loading then click on a product and add it to the cart', () => {
        cy.visit('/products');

        cy.get('[data-test="loading"]').should('exist');
        cy.get('[data-test="loading"]').should('not.exist', { timeout: 5000 });

        cy.get('[data-test="product-1"]')
            .should('exist')
            .click()
            .then(() => {
                cy.get('[data-test="add-to-cart"]').should('have.text', 'Add to cart').click();

                cy.url().should('include', '/login');
            });
    });
    it('logins and adds a product to the cart', () => {
        cy.visit('/login');
        cy.get('[data-test="email"]').type('barrett.parisian@example.com');
        cy.get('[data-test="password"]').type('password');
        cy.get('[data-test="sign-in"]').should('exist').click();

        cy.get('[data-test="product-1"]')
            .should('exist')
            .click()
            .then(() => {
                cy.wait(1000);
                cy.get('[data-test="add-to-cart"]').should('exist').click();
                cy.wait(2000);

                cy.get('[data-test="shopping-cart"]')
                    .should('exist')
                    .click()
                    .then(() => {
                        cy.get('[data-test="cart-item-0"]').should('exist');
                        cy.get('[data-test="add-quantity"]').should('exist').click();
                        cy.get('[data-test="quantity"]').should('have.text', '2');
                        cy.get('[data-test="subtract-quantity"]').should('exist').click();
                        cy.get('[data-test="quantity"]').should('have.text', '1');
                        cy.get('[data-test="remove-from-cart"]').should('exist').click();
                        cy.wait(2000);
                        cy.get('[data-test="empty-cart"]').should('exist');
                    });
            });
    });
});

describe('API tests', () => {
    it('Should make an API request to get products and expect a 200 status code', () => {
        cy.request('http://localhost:8000/api/products').then((response) => {
            expect(response.status).to.eq(200);

            const products = response.body;

            expect(products.length).to.gte(1);

            products.forEach((product) => {
                expect(product).to.have.property('id');
                expect(product).to.have.property('name');
                expect(product).to.have.property('description');
                expect(product).to.have.property('mainPhoto');
                expect(product).to.have.property('price');
            });
        });
    });
});
