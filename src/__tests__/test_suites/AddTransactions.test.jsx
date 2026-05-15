import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AccountContainer from '../../components/AccountContainer'

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 }
]

describe("Add Transactions", () => {
  beforeEach(() => {
    setFetchResponse(mockTransactions)
  })

  it("adds a new transaction to the frontend", async () => {
    render(<AccountContainer />)

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
    })

    const newTransaction = { id: "13", date: "2019-12-20", description: "New Test Transaction", category: "Test", amount: 50 }
    setFetchResponse(newTransaction)

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "New Test Transaction" } })
    fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Test" } })
    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "50" } })
    fireEvent.click(screen.getByText("Add Transaction"))

    await waitFor(() => {
      expect(screen.getByText("New Test Transaction")).toBeInTheDocument()
    })
  })

  it("makes a POST request when a transaction is submitted", async () => {
    render(<AccountContainer />)

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
    })

    const newTransaction = { id: "14", date: "2019-12-21", description: "Post Test Transaction", category: "Test", amount: 25 }
    setFetchResponse(newTransaction)

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Post Test Transaction" } })
    fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Test" } })
    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "25" } })
    fireEvent.click(screen.getByText("Add Transaction"))

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:6001/transactions',
      expect.objectContaining({ method: 'POST' })
    )

    await waitFor(() => {
      expect(screen.getByText("Post Test Transaction")).toBeInTheDocument()
    })
  })
})
