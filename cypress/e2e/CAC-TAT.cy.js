/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Tayse')
          .get('#lastName').type('Sabrina')
          .get('#email').type('taysabrina@gmail.com')
          .get('#open-text-area').type(longText,{delay: 0})
          .get('button').contains('Enviar').click()
          .get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Tayse')
          .get('#lastName').type('Sabrina')
          .get('#email').type('taysabrina@gmail,com')
          .get('#open-text-area').type('erro')
          .get('button').contains('Enviar').click()
          .get('.error').should('be.visible')
    })

    it('Campo número de telefone continua vazio ao inserir valor não númerico', function(){
        cy.get('#phone')
        .type('abcdefij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        const longText = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Tayse')
          .get('#lastName').type('Sabrina')
          .get('#email').type('taysabrina@gmail.com')
          .get('#phone-checkbox').click()
          .get('#open-text-area').type(longText,{delay: 0})
          .get('button').contains('Enviar').click()
          .get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Sabrina').should('have.value', 'Sabrina')
          .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button').contains('Enviar').click()
          .get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
          .get('.success').should('be.visible')
    })
})