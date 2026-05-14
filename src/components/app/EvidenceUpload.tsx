'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { fileSizeLabel } from '@/lib/utils'
import { Upload, X, FileText, ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { Evidence } from '@/types'

interface EvidenceUploadProps {
  disputeId: string
  uploadedBy: string
  role: 'initiator' | 'respondent'
  existingEvidence?: Evidence[]
  onUpload?: (evidence: Evidence) => void
}

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function EvidenceUpload({
  disputeId,
  uploadedBy,
  role,
  existingEvidence = [],
  onUpload,
}: EvidenceUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<Evidence[]>(existingEvidence)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('File type not supported. Please upload images or PDFs.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large. Maximum size is 10MB.')
      return
    }

    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${disputeId}/${role}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('evidence')
        .upload(fileName, file, { cacheControl: '3600' })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('evidence')
        .getPublicUrl(fileName)

      const { data: evidence, error: dbError } = await supabase
        .from('evidence')
        .insert({
          dispute_id: disputeId,
          uploaded_by: uploadedBy,
          file_url: publicUrl,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          role,
        })
        .select()
        .single()

      if (dbError) throw dbError

      const newEvidence = evidence as Evidence
      setFiles((prev) => [...prev, newEvidence])
      onUpload?.(newEvidence)
      toast.success('Evidence uploaded successfully')
    } catch (err) {
      console.error('Upload error:', err)
      toast.error('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleRemove = async (evidenceId: string, fileUrl: string) => {
    try {
      // Extract path from URL
      const url = new URL(fileUrl)
      const path = url.pathname.split('/evidence/')[1]

      await supabase.storage.from('evidence').remove([path])
      await supabase.from('evidence').delete().eq('id', evidenceId)

      setFiles((prev) => prev.filter((f) => f.id !== evidenceId))
      toast.success('Evidence removed')
    } catch {
      toast.error('Failed to remove file')
    }
  }

  const isImage = (type: string) => type.startsWith('image/')

  return (
    <div className="space-y-3">
      {/* Upload zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          dragOver
            ? 'border-arbitrator-400 bg-arbitrator-50'
            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleInputChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-arbitrator-500 animate-spin" />
            <p className="text-sm text-slate-500">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-1">
              <Upload className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-slate-400">
              Images, PDFs, text files up to 10MB
            </p>
          </div>
        )}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl"
            >
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                {isImage(file.file_type) ? (
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {file.file_name}
                </p>
                <p className="text-xs text-slate-400">
                  {fileSizeLabel(file.file_size)}
                </p>
              </div>
              <a
                href={file.file_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-arbitrator-600 hover:underline shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                View
              </a>
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(file.id, file.file_url) }}
                className="p-1 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
