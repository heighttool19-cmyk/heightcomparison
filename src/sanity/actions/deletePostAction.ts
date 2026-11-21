import { useState } from 'react'
import { DocumentActionProps, useDocumentOperation } from 'sanity'
import { TrashIcon } from '@sanity/icons'

export function DeletePostAction({ id, type, onComplete }: DocumentActionProps) {
  const { delete: deleteOp } = useDocumentOperation(id, type)
  const [isConfirming, setIsConfirming] = useState(false)

  return {
    label: 'Delete Post',
    title: 'Delete this blog post permanently',
    icon: TrashIcon,
    tone: 'critical' as const,
    disabled: Boolean(deleteOp.disabled),
    onHandle: () => {
      setIsConfirming(true)
    },
    dialog: isConfirming && {
      type: 'confirm' as const,
      tone: 'critical' as const,
      message: 'Are you sure you want to permanently delete this blog post? This action cannot be undone.',
      onConfirm: () => {
        deleteOp.execute()
        setIsConfirming(false)
        onComplete()
      },
      onCancel: () => {
        setIsConfirming(false)
      },
    },
  }
}

