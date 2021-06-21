import {render, screen} from '@testing-library/react';
import React from 'react';
// import Home from 'D:/Code/Supra Coders/mars-weather-app/src/Home'

describe("Home test", () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000')
  })
  it("displays weather", () => {
    cy.contains("Mars weather")
  })
  it("shows highs and lows for past dates", () => {
    cy.contains("Highs")
    cy.contains("Lows")
  })
  it("clicking a weather card loads a page with more details", () => {
    cy.get(".flip-card").click()
    cy.location('pathname').should('eq', '/Details')
  })
  it("clicking the home icon takes you to the home page", () => {
    cy.get(".Logo").click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
  it("should yield results for a searched date", () =>{
    cy.get('#date').click().type('2021-05-01')
    cy.url().should('include', "Search")
    cy.contains("Mars weather for 2021-05-01")
  })
})