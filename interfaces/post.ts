export interface IPost {
    _id?: string
    title: string
    content: [{ type: string, html: string, content: string, image: { public_id: string, url: string } }],
    state: boolean
    image: { public_id: string, url: string }
    description: string
    titleSeo?: string
    descriptionSeo?: string

    createdAt?: Date
    updatedAt?: Date
}