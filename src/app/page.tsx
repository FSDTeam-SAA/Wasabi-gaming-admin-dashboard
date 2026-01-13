import Login from '@/components/auth/Login'
import Dashboard from '@/components/pages/Dashboard/Dashboard'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
}
