Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Tayse')
        .get('#lastName').type('Sabrina')
        .get('#email').type('taysabrina@gmail.com')
        .get('#open-text-area').type('teste')
        .get('button').contains('Enviar').click()
})