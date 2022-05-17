// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTodo', (todoName) => {
  cy.get('.new-todo').type(`${todoName}{enter}`)
})

Cypress.Commands.add('clickSelectTodo', (todoName) => {
  cy.contains(todoName).siblings('.toggle').click()
})

Cypress.Commands.add('editTodo', (todoName, editTodoName) => {
  cy.contains(todoName).dblclick().focused().clear()
  cy.get('.editing').type(`${editTodoName}{enter}`)
})

Cypress.Commands.add('deleteTodo', (todoName) => {
  cy.contains(todoName).siblings('.destroy').invoke('show').click()
})

/**
 * Commands for handling menu buttons
 */

Cypress.Commands.add('clickAllButton', () => {
  cy.get('.filters').contains('All').click()
  cy.url().should('include', '#/')
  cy.contains('All').should('have.class', 'selected')
})

Cypress.Commands.add('clickActiveButton', () => {
  cy.get('.filters').contains('Active').click()
  cy.url().should('include', '#/active')
  cy.contains('Active').should('have.class', 'selected')
})

Cypress.Commands.add('clickCompletedButton', () => {
  cy.get('.filters').contains('Completed').click()
  cy.url().should('include', '#/completed')
  cy.contains('Completed').should('have.class', 'selected')
})

Cypress.Commands.add('clickClearCompletedButton', () => {
  cy.get('.clear-completed').contains('Clear completed').click()
})

/**
 * Commands for checking classes and labels
 */

Cypress.Commands.add('checkTodoLabelExists', () => {
  cy.get('.header').should('exist').contains('todos')
})

Cypress.Commands.add('checkNewTodoInputExists', () => {
  cy.get('.new-todo').should('have.attr', 'placeholder', 'What needs to be done?')
})

Cypress.Commands.add('checkFooterLabelExists', () => {
  cy.get('.info').should('exist')
  cy.get('.info').contains('Double-click to edit a todo')
  cy.get('.info').contains('Created by')
  cy.get('.info').contains('petehunt')
  cy.get('.info').contains('Part of TodoMVC')
})

Cypress.Commands.add('checkFilterLabelExists', () => {
  cy.get('.filters').should('exist')
  cy.get('.filters').contains('All')
  cy.get('.filters').contains('Active')
  cy.get('.filters').contains('Completed')
})

Cypress.Commands.add('checkClearCompletedButtonExists', () => {
  cy.get('.clear-completed').should('exist')
  cy.get('.clear-completed').contains('Clear completed')
})

Cypress.Commands.add('checkTodoExistsInRow', (row, element) => {
  cy.get('.todo-list').children().eq(row).contains(element)
})

Cypress.Commands.add('checkNumberOfTodos', (number) => {
  cy.get('.todo-list').children().should('have.length', number)
})

Cypress.Commands.add('toggleTodoByRow', (row) => {
  cy.get('.view').children().eq(row).click()
})

Cypress.Commands.add('checkTodoIsCheckedByRow', (row) => {
  cy.get('.todo-list').children().eq(row).should('have.class', 'completed')
})

/**
 * Custom checker for count in items counter
 */
Cypress.Commands.add('checkTodoCounterLabelCount', (count) => {
  cy.get('.todo-count').should('exist')
  if (count === '1') {
    cy.get('.todo-count').contains(count)
    cy.get('.todo-count').contains('item')
    cy.get('.todo-count').contains('left')
  }

  if (count !== '1') {
    cy.get('.todo-count').contains(count)
    cy.get('.todo-count').contains('items')
    cy.get('.todo-count').contains('left')
  }
})

/**
 * Commands for setting up todo data
 */

Cypress.Commands.add('setActiveTodo', () => {
  /**
   * Loads data from fixture and inject it to local storage
   */
  cy.fixture('localStorage/react-todos/todos').then((todo) => {
    localStorage.setItem(todo.activeTodo.key, JSON.stringify(todo.activeTodo.value))
  })
  /**
   * Reloads site to take local storage in effect
   */
  cy.reload()
})

Cypress.Commands.add('setCompletedTodo', () => {
  /**
   * Loads data from fixture and inject it to local storage
   */
  cy.fixture('localStorage/react-todos/todos').then((todo) => {
    localStorage.setItem(todo.completedTodo.key, JSON.stringify(todo.completedTodo.value))
  })
  /**
   * Reloads site to take local storage in effect
   */
  cy.reload()
})

Cypress.Commands.add('setDefaultTodos', () => {
  /**
   * Loads data from fixture and inject it to local storage
   */
  cy.fixture('localStorage/react-todos/todos').then((todo) => {
    localStorage.setItem(todo.defaultTodos.key, JSON.stringify(todo.defaultTodos.value))
  })
  /**
   * Reloads site to take local storage in effect
   */
  cy.reload()
})