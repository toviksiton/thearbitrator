'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle, AlertCircle, Key } from 'lucide-react'
import { toast } from 'sonner'

export default function SecuritySettings() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setNewPassword('')
      setConfirmPassword('')
      toast.success('Password updated successfully')
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-slate-400" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>
            Update your password. You&apos;ll be required to enter it at your next sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert variant="success" className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Password updated successfully.</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repeat your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active sessions info */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Sign out all devices if you suspect unauthorized access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut({ scope: 'global' })
              toast.success('Signed out of all devices')
              window.location.href = '/login'
            }}
          >
            Sign Out All Devices
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
