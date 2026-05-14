import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [{ data: disputes }, { data: evidence }, { data: aiOutputs }] =
    await Promise.all([
      supabase.from('disputes').select('*').eq('created_by', user.id),
      supabase
        .from('evidence')
        .select('*')
        .eq('uploaded_by', user.id),
      supabase
        .from('ai_outputs')
        .select('*')
        .in(
          'dispute_id',
          disputes?.map((d) => d.id) ?? []
        ),
    ])

  const exportData = {
    exported_at: new Date().toISOString(),
    user: { id: user.id, email: user.email },
    disputes: disputes ?? [],
    evidence: evidence ?? [],
    ai_outputs: aiOutputs ?? [],
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="thearbitrator-data.json"',
    },
  })
}
