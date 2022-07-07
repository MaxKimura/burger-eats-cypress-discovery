

// describe é a suite de testes, it é o caso de teste
describe('home page', ()=>{
    it ('app deve estar online', ()=>{

        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

    })
})