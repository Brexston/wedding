export interface Picture {
	src: string;
	alt: string;
}

export interface MediaItem {
	id: number;
	name: string;
	url: string;
	date: string;
	picture?: Picture;
}
