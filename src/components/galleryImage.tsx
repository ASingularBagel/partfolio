/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

const GalleryImage = (URL: string, title: string | null, tags: Array<string>) => {
    const [imageURL, setImageURL] = useState<string | null>(null); // TODO : Set the image URL to the URL passed in

    // Title and tags are optional, they can be retrieved from the image file's name
    const [imageTitle, setImageTitle] = useState<string | null>(null);
    const [imageTags, setImageTags] = useState<Array<string> | null>(null);

    // Thumbnail derived from the image
    const [thumbnail, setThumbnail] = useState<string | null>(null);

  return (
    <>
    if(title !== null) {}
    </>
  )
}

export default GalleryImage