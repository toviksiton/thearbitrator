'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle, AlertCircle, Camera } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfileSettings() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (profile) {
        setFullName(profile.full_name || user.user_metadata?.full_name || '')
        setAvatarUrl(profile.avatar_url || user.user_metadata?.avatar_url || '')
      }
      setIsLoading(false)
    }
    load()
  }, [supabase])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      await supabase
        .from('profiles')
        .upsert({ id: user.id, full_name: fullName, avatar_url: avatarUrl })

      await supabase.auth.updateUser({
        data: { full_name: fullName },
      })

      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB')
      return
    }

    setUploadingAvatar(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const ext = file.name.split('.').pop()
      const path = `avatars/${user.id}.${ext}`

      const { error } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(path)

      setAvatarUrl(publicUrl)
      toast.success('Avatar uploaded')
    } catch {
      toast.error('Failed to upload avatar')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const initials = fullName
    ? fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : email.slice(0, 2).toUpperCase()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your name and profile photo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-lg bg-arbitrator-100 text-arbitrator-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                {uploadingAvatar ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
                ) : (
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                />
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{fullName || 'Your name'}</p>
              <p className="text-xs text-slate-400">{email}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={email} disabled className="bg-slate-50 text-slate-500" />
              <p className="text-xs text-slate-400">
                Email cannot be changed here. Contact support if needed.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
