import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import AccountContainer from '../../components/AccountContainer'

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-01", description: "Chipotle", category: "Food", amount: -10.55 },
  { id: "3", date: "2019-12-02", description: "Lyft Ride", category: "Transportation", amount: -13.25 }
]

describe("Search Transactions", () => {
  beforeEach(() => {
    setFetchResponse(mockTransactions)
  })

  it("filters transactions based on the search input", async () => {
    render(<AccountContainer />)

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
    })

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "Chipotle" } }
    )

    expect(screen.getByText("Chipotle")).toBeInTheDocument()
    expect(screen.queryByText("Paycheck from Bob's Burgers")).not.toBeInTheDocument()
    expect(screen.queryByText("Lyft Ride")).not.toBeInTheDocument()
  })
})

describe("Sort Transactions", () => {
  beforeEach(() => {
    setFetchResponse(mockTransactions)
  })

  it("sorts transactions alphabetically by description", async () => {
    render(<AccountContainer />)

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "description" } })

    const rows = screen.getAllByRole("row")
    // rows[0] is the header row; data rows follow
    // Alphabetical by description: Chipotle, Lyft Ride, Paycheck from Bob's Burgers
    expect(rows[1]).toHaveTextContent("Chipotle")
    expect(rows[2]).toHaveTextContent("Lyft Ride")
    expect(rows[3]).toHaveTextContent("Paycheck from Bob's Burgers")
  })

  it("sorts transactions alphabetically by category", async () => {
    render(<AccountContainer />)

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "category" } })

    const rows = screen.getAllByRole("row")
    // Alphabetical by category: Food (Chipotle), Income (Paycheck), Transportation (Lyft Ride)
    expect(rows[1]).toHaveTextContent("Chipotle")
    expect(rows[2]).toHaveTextContent("Paycheck from Bob's Burgers")
    expect(rows[3]).toHaveTextContent("Lyft Ride")
  })
})
