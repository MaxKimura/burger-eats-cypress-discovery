import SignupPageJS from '../Pages/SignupPage'
import signup from '../Pages/SignupPage'

describe('Cadastro', () => {

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function () {
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Usuário informa CPF incorreto', function () {
        signup.go()
        signup.fillForm(this.deliver.cpf_inv)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Usuário informa email incorreto', function () {
        signup.go()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Campos obrigatorios', function () {
        const messages = [
            { campo: 'name', output: 'É necessário informar o nome' },
            { campo: 'cpf', output: 'É necessário informar o CPF' },
            { campo: 'email', output: 'É necessário informar o email' },
            { campo: 'postalcode', output: 'É necessário informar o CEP' },
            { campo: 'number', output: 'É necessário informar o número do endereço' },
            { campo: 'delivery_method', output: 'Selecione o método de entrega' },
            { campo: 'cnh', output: 'Adicione uma foto da sua CNH' }

        ]

        before(function(){
            signup.go()
            signup.submit() 
        })

        messages.forEach(function(msg){
            it(`${msg.campo} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })
})
