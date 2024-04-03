import React from "react"

type Props = {
  containerStyle?: string
  imageStyle?: string
  src: string
  alt?: string
}

const ProductImage = ({
  containerStyle,
  imageStyle,
  src,
  alt,
}: Props) => {
  return (
    <div className={containerStyle}>
      <img className={imageStyle} src={src} alt={alt} />
    </div>
  )
}

export default ProductImage
