import React, { useState, useEffect } from 'react'

interface Props {
    file: File
}

const PreviewPhoto: React.FC<Props> = ({ file }) => {
    const [previewImg, setPreviewImg] = useState<ArrayBuffer | null | string>(
        null
    )

    useEffect(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewImg(reader.result)
        }
        reader.readAsDataURL(file)
    }, [file])

    return (
        <div>
            {previewImg && typeof previewImg === 'string' ? (
                <img
                    alt={file.name}
                    loading="lazy"
                    src={previewImg}
                    className="mt-4 md:mr-4 lg:mr-6 xl:mr-9 md:mt-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-cover"
                />
            ) : null}
        </div>
    )
}

export default PreviewPhoto
