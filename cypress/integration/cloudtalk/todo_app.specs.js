/*
Implement tests in this file
Assignment should contain proper file structure and reusable
design which is up to candidate and will be discussed on live
coding
So be creative and think about design which will be accurate
when number of tests increase in future
Please put a solution on github and send a link to us and I wish
Good luck !
*/

describe('Tests todo app', function () {
// Test suite [Before Each] setup data
beforeEach(() => {
  cy.visit("/")
})

// Testing data
const todo = require('../../fixtures/todos.json')

context('Todo app tests', () => {
  it('Test 1', () => {
    cy.createTodo(todo.TODO_ITEM_ONE)
    cy.createTodo(todo.TODO_ITEM_TWO)
    cy.checkTodoExistsInRow(0, todo.TODO_ITEM_ONE)
    cy.checkTodoExistsInRow(1, todo.TODO_ITEM_TWO)
    cy.checkNumberOfTodos(2)
    })

  it('Test 2', () => {
    cy.createTodo(todo.TODO_ITEM_ONE)
    cy.createTodo(todo.TODO_ITEM_TWO)
    cy.checkTodoExistsInRow(0, todo.TODO_ITEM_ONE)
    cy.checkTodoExistsInRow(1, todo.TODO_ITEM_TWO)
    cy.checkNumberOfTodos(2)
    cy.toggleTodoByRow(0)
    cy.checkTodoIsCheckedByRow(0)
  })
  })
})



