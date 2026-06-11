'use client'

import React, { useState, useCallback, useRef } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/lib/cropImage'

interface ImageUploadWithCropProps {
  onUploadSuccess: (url: string) => void
  aspectRatio?: number
  buttonText?: string
  className?: string
  style?: React.CSSProperties
}

export default function ImageUploadWithCrop({
  onUploadSuccess,
  aspectRatio = 1,
  buttonText = '📁 Upload Photo',
  className = 'image-upload-area',
  style,
}: ImageUploadWithCropProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{x: number, y: number, width: number, height: number} | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null)
      })
      reader.readAsDataURL(file)
      // clear the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const onCropComplete = useCallback((croppedArea: {x: number, y: number, width: number, height: number}, croppedAreaPixels: {x: number, y: number, width: number, height: number}) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setUploading(true)
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (!croppedImage) throw new Error('Failed to crop image')

      const form = new FormData()
      form.append('file', croppedImage, 'cropped-image.jpg')

      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error('Upload failed')
      
      const { url } = await res.json()
      onUploadSuccess(url)
      
      // Close modal
      setImageSrc(null)
    } catch (e) {
      console.error(e)
      alert('Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className={className} style={style}>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} />
        {uploading ? <span className="spinner" /> : buttonText}
      </div>

      {imageSrc && (
        <div className="cropper-modal-overlay">
          <div className="cropper-modal">
            <div className="cropper-header">
              <h3>Crop Image</h3>
              <button className="btn-danger" onClick={() => setImageSrc(null)}>Cancel</button>
            </div>
            
            <div className="cropper-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="cropper-controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-range"
              />
            </div>

            <div className="cropper-footer">
              <button className="btn-admin-primary" onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Confirm & Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}