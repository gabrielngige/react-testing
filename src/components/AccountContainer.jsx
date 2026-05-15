import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(data => setTransactions(data))
  }, [])

  function postTransaction(newTransaction) {
    fetch('http://localhost:6001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(r => r.json())
      .then(data => setTransactions([...transactions, data]))
  }

  function onSort(key) {
    setSortBy(key)
  }

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase())
  )

  const displayedTransactions = sortBy
    ? [...filteredTransactions].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])))
    : filteredTransactions

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
