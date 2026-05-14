'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DangerZone() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') return
    setIsDeleting(true)

    try {
      const res = await fetch('/api/account/delete', { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')

      await supabase.auth.signOut()
      toast.success('Account deleted. We\'re sorry to see you go.')
      router.push('/')
    } catch {
      toast.error('Failed to delete account. Please contact support.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Actions in this section are permanent and cannot be undone.
        </AlertDescription>
      </Alert>

      {/* Export data */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Export Your Data</CardTitle>
          <CardDescription>
            Download all your dispute data, evidence references, and AI outputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={async () => {
              const res = await fetch('/api/account/export')
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'thearbitrator-data.json'
              a.click()
              toast.success('Data export started')
            }}
          >
            Export All Data
          </Button>
        </CardContent>
      </Card>

      {/* Delete account */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-red-700">Delete Account</CardTitle>
          <CardDescription className="text-red-600">
            Permanently delete your account and all associated data. This cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            <AlertTriangle className="w-4 h-4" />
            Delete My Account
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle>Delete Account Permanently</DialogTitle>
            <DialogDescription>
              All your disputes, evidence, and AI outputs will be permanently deleted.
              Any active subscriptions will be canceled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-2">
            <p className="text-sm text-slate-600">
              Type <strong>DELETE</strong> to confirm:
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="font-mono"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={confirmText !== 'DELETE' || isDeleting}
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
