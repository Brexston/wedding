// https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
export type MimeTypes
	// Text types
	= | 'text/css'
		| 'text/html'
		| 'text/javascript'
		| 'text/plain'
		| 'text/xml'

    // Image types
		| 'image/gif'
		| 'image/jpeg'
		| 'image/png'
		| 'image/svg+xml'
		| 'image/webp'

    // Audio types
		| 'audio/midi'
		| 'audio/mpeg'
		| 'audio/ogg'
		| 'audio/wav'
		| 'audio/webm'

    // Video types
		| 'video/mp4'
		| 'video/mpeg'
		| 'video/ogg'
		| 'video/webm'

    // Application types
		| 'application/json'
		| 'application/ld+json'
		| 'application/msword'
		| 'application/pdf'
		| 'application/vnd.ms-excel'
		| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		| 'application/vnd.mozilla.xul+xml'
		| 'application/x-www-form-urlencoded'
		| 'application/zip'
		| 'application/octet-stream'
		| 'application/rtf'

    // Font types
		| 'font/otf'
		| 'font/ttf'
		| 'font/woff'
		| 'font/woff2'

    // Multipart types
		| 'multipart/form-data'

    // Other
		| 'application/x-rar-compressed'
		| 'application/x-tar'
;
