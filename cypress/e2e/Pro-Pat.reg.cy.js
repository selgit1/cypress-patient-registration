import { faker } from '@faker-js/faker';


//const email = faker.person.email();
//cy.get('#email').type(email)


describe('Patient Signup with OTP', () => {
  it('Registers patient and enters OTP', () => {

    cy.viewport(1200, 800)
    cy.visit('https://vicarereleaseqa.smartclinix.net')
    cy.wait(500)
     cy.get('#Username',{timeout:9000}).type('11live')
   cy.get('#Password').type("Password1@")
    cy.get('.col-md-12 .btn').click()
    

        // Array to store patient names
    const patientNames = [];

    let isFirstIteration = true;
      // Number of patients to create
    const numPatients = 2;






    for (let i = 0; i < numPatients; i++) {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

// Store name for later logging
    patientNames.push({ firstName, lastName });


const dob = new Date();

// Generate a random year: at least 18 years old
const minAge = 18;
const maxAge = 65; // optional maximum age
const randomYear = dob.getFullYear() - (Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge);
dob.setFullYear(randomYear);

// Random month and day
dob.setMonth(Math.floor(Math.random() * 12));
dob.setDate(Math.floor(Math.random() * 28) + 1);

const dobStr = `${(dob.getMonth()+1).toString().padStart(2,'0')}/${dob.getDate().toString().padStart(2,'0')}/${dob.getFullYear()}`;

console.log(dobStr); // MM/DD/YYYY, random year, at least 18 years old





           cy.log(`Creating patient #${i + 1}: ${firstName} ${lastName}`);
cy.wait(3000)
          cy.contains('span', 'Add Patient').click()


    //cy.get('.icons-section.ng-star-inserted > .text-icon > .text').click()
      
//     cy.wait(8000)
    cy.get('#firstNameInput').type(firstName)
    cy.wait(800)
    cy.get('#lastNameInput').type(lastName)
    cy.get('.dateTimeField').type(dobStr)
    cy.wait(1000)
    


    
   // Wait only on the first iteration BEFORE gender dropdown click
    if (isFirstIteration) {
        cy.wait(1000)  // wait for gender data to load
        isFirstIteration = false
    }

    // Click gender dropdown
    cy.get('p-dropdown[formcontrolname="gender"] .p-dropdown-trigger')
      .should('be.visible')
      .click()

    // Select Male
    cy.contains('.p-dropdown-item', 'Male').click()

     cy.get('#mobileNumber').type("+1")
     cy.get('#mobileNumber').type("9046880203")
  cy.wait(500)

  
                //Countries-dropdown
  cy.wait(500)
cy.get('.p-dropdown-label').eq(3).click()

// Step 3: Select the option
cy.contains('li', 'United States America', { timeout: 5000 })
  .click();




    // cy.get(':nth-child(8) > .form-group > .p-float-label > .p-inputtext').type('John Smith, 123 Main Street, Anytown, CA 12345')
    cy.wait(500)
    //  cy.get('#pn_id_55 > .p-dropdown-label').click()
    //  cy.get('#pn_id_55_2').click()

     // Zip Code

  //cy.get('div.p-autocomplete input.p-autocomplete-input').eq(1).type("32201");      ///prac106


 // Try first selector (Prac33)
cy.get('body').then(($body) => {
  if ($body.find('.form-row > :nth-child(2) > .form-group > .p-float-label > .p-inputtext').length) {
    // Prac33 exists
    cy.get('.form-row > :nth-child(2) > .form-group > .p-float-label > .p-inputtext')
      .click()
      .type('32201');
  } else {
    // Otherwise, try Prac106
    cy.get('div.p-autocomplete input.p-autocomplete-input')
      .eq(1)  // second input
      .click()
      .type('32201');
  }
});



    cy.wait(500);

    cy.get('body').then($body => {
    const option = $body.find('#pn_id_57_0:contains("Jacksonville")');

      if (option.length > 0) {
      cy.log("Jacksonville found — clicking");
      cy.get('#pn_id_57_0').click();
    } else {
      cy.log("Jacksonville not found — skipping click");
    }
        });
     
      cy.wait(500)
    // Convert first letter to lowercase
    const lowerFirstName = firstName.charAt(0).toLowerCase() + firstName.slice(1);

// Use it in the email input
    cy.get(':nth-child(12) > .form-group > .p-float-label > .p-inputtext')
     .type(`${lowerFirstName}@yopmail.com`);


     cy.wait(1000)


    cy.get('button.btn.btn-success.btn-sm.mr-2').click()
    cy.wait(3000)
    }


// After loop finishes, log all patient names
cy.then(() => {
    cy.log('All created patients:');
    patientNames.forEach((p, index) => {
        cy.log(`#${index + 1}: ${p.firstName} ${p.lastName}`);
        console.log(`#${index + 1}: ${p.firstName} ${p.lastName}`);
    });
      //cy.get(':nth-child(12) > .form-group > .p-float-label > .p-inputtext').type(firstName,'yopmail.com')
  })

})
})