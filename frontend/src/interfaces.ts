export interface PreviewNote {
    title: string;
    lastModified: { $date: number };
    image?: string;
}

export interface Note extends PreviewNote {
    _id: { $oid: string; };
}

export interface NoteWithContent extends Note {
    content: string;
}
