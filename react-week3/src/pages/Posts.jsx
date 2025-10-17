import { useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'

export default function Posts(){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if(!res.ok) throw new Error('Network response not ok')
        return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Failed to load')
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())), [posts, search])
  const total = Math.ceil(filtered.length / perPage)
  const start = (page - 1) * perPage
  const current = filtered.slice(start, start + perPage)

  if (loading) return <p>Loading posts...</p>
  if (error) return <p style={{ color:'red' }}>{error}</p>

  return (
    <div>
      <h2>Posts (API)</h2>
      <input style={{ padding:8, width:'70%', marginBottom:12 }} placeholder="Search by title..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
      {current.map(p => (
        <div key={p.id} style={{ border:'1px solid #e6e9ef', padding:12, borderRadius:8, marginBottom:10 }}>
          <h3 style={{ margin:'0 0 6px' }}>{p.title}</h3>
          <p style={{ margin:0 }}>{p.body}</p>
        </div>
      ))}

      <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:12 }}>
        <Button variant="secondary" onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
        <div>Page {page} of {total}</div>
        <Button variant="primary" onClick={() => setPage(p => Math.min(total, p + 1))}>Next</Button>
      </div>
    </div>
  )
}
