import sanitizeHtml from 'sanitize-html';

export function safeHTML(content: string) {
	return sanitizeHtml(content, {
		allowedTags: [
			'div', 'span',
			'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
			'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li',
			'blockquote', 'code', 'pre', 'br', 'hr', 'img'
		],
		allowedAttributes: {
			a: ['href', 'target', 'rel'],
			img: ['src', 'alt', 'title', 'width', 'height'],
			div: ['style'],
			span: ['style'],
			p: ['style'],
			code: ['style']
		},
		allowedStyles: {
			// hanya izinkan properti CSS yang aman
			'*': {
				'color': [/^.*$/],
				'background-color': [/^.*$/],
				'text-align': [/^left$|^right$|^center$|^justify$/],
				'margin': [/^.*$/],
				'margin-left': [/^.*$/],
				'margin-right': [/^.*$/],
				'padding': [/^.*$/],
				'font-size': [/^.*$/],
				'font-weight': [/^.*$/]
			}
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' })
		}
	});
}
