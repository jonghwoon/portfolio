'use client'

import { getTechByName } from '@/lib/techStacks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TechTagProps {
  name: string
  onRemove?: () => void
}

export default function TechTag({ name, onRemove }: TechTagProps) {
  const tech = getTechByName(name)

  return (
    <span className="tech-tag">
      {tech?.icon && (
        <span className="tech-tag-icon">
          <FontAwesomeIcon icon={tech.icon} width="16" height="16" />
        </span>
      )}
      <span className="tech-tag-name">{name}</span>
      {onRemove && (
        <button className="tech-tag-remove" onClick={onRemove} type="button" aria-label="Remove">
          ×
        </button>
      )}
    </span>
  )
}
