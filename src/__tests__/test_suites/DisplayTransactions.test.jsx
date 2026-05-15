import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AccountContainer from '../../components/AccountContainer'

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-01", description: "Chipotle", category: "Food", amount: -10.55 }
]

describe("Display Transactions", () => {
  beforeEach(() => {
    setFetchResponse(mockTransactions)
  })

  it("displays all transactions on initial load", async () => {
    render(<AccountContainer />)
    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
      expect(screen.getByText("Chipotle")).toBeInTheDocument()
    })
  })
})
