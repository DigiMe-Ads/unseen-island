import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { Button, Notice, inputCls } from './ui.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setBusy(false)
    if (error) setError(error.message === 'Invalid login credentials' ? 'Incorrect email or password.' : error.message)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-sand px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="font-logo text-3xl text-teal">THE UNSEEN ISLAND</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted">Admin</p>
        </div>
        {error && <Notice tone="error">{error}</Notice>}
        <label className="block space-y-1.5">
          <span className="text-sm text-ink">Email</span>
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm text-ink">Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </label>
        <Button type="submit" variant="primary" disabled={busy} className="w-full py-2.5">
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
