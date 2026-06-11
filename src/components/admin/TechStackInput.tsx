'use client'

import { useState, useRef, useEffect } from 'react'
import { TECH_STACKS, filterTechs, getTechByName } from '@/lib/techStacks'
import TechTag from '../TechTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TechStackInputProps {
  value: string[]
  onChange: (techs: string[]) => void
}

export default function TechStackInput({ value, onChange }: TechStackInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredTechs, setFilteredTechs] = useState(TECH_STACKS)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = filterTechs(inputValue)
    setFilteredTechs(filtered)
    setHighlightedIndex(0)
  }, [inputValue])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addTech = (tech: string) => {
    if (!value.includes(tech)) {
      onChange([...value, tech])
    }
    setInputValue('')
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  const removeTech = (tech: string) => {
    onChange(value.filter(t => t !== tech))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredTechs.length > 0) {
        addTech(filteredTechs[highlightedIndex].name)
      } else if (inputValue.trim()) {
        addTech(inputValue.trim())
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => (prev + 1) % filteredTechs.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => (prev - 1 + filteredTechs.length) % filteredTechs.length)
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div className="tech-stack-input-container">
      <div className="tag-input-wrapper">
        {value.map(tech => (
          <TechTag key={tech} name={tech} onRemove={() => removeTech(tech)} />
        ))}
        <div className="tech-input-wrapper" ref={dropdownRef}>
          <input
            ref={inputRef}
            className="tag-input-field"
            type="text"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="React, Node.js, ..."
            autoComplete="off"
          />
          {showDropdown && filteredTechs.length > 0 && (
            <div className="tech-dropdown">
              {filteredTechs.map((tech, idx) => (
                <div
                  key={tech.name}
                  className={`tech-option ${idx === highlightedIndex ? 'highlighted' : ''}`}
                  onClick={() => addTech(tech.name)}
                >
                  <div className="tech-option-content">
                    {tech.icon && (
                      <FontAwesomeIcon icon={tech.icon} width="16" height="16" className="tech-option-icon" />
                    )}
                    <span className="tech-option-name">{tech.name}</span>
                  </div>
                  {tech.category && <span className="tech-option-category">{tech.category}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
