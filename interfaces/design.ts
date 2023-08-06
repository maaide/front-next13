export interface IDesign {
    header: {
        topStrip: String
    }
    home: {
        banner: IBanner[],
        category: {
            titleCategory: boolean
            descriptionCategory: boolean
        },
        products: {
            title: string
            sectionProducts: string
            category?: string
        }
    }
    product: {
        title: string
        sectionProducts: string
        category?: string
    }
    contact: {
        title: string
        text: string
        titleForm: string
    }
    shop: {
        title: string
        description: string
        banner?: { public_id: string, url: string }
    }
    subscription: {
        title: string
    }
    cart: {
        title: string
        sectionProducts: string
        category?: string
    }
}

export interface IBanner {
    image: { public_id: string, url: string }
    title: string
    text: string
    textButton: string
    linkButton: string
}