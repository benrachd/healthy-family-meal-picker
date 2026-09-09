import { useState } from 'react'
import { PLACEHOLDER_IMAGE, resolveRecipeImage } from '../lib/images'

interface RecipeImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function RecipeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: RecipeImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveRecipeImage(src))

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
    />
  )
}
