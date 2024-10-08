export class Produit {
    constructor(public id: number,
                public sku: string,
                public name: string,
                public description: string,
                public unitPrice: number,
                public imageUrl: string,
                public active: boolean,
                public unitInStock: number,
                public dateCreated: Date,
                public lastUpdated: Date) {
    }
}
