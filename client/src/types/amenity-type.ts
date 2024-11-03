


export type AmenityType = {

    _id: string;
    amenityName: string;
    amenityType: string;
    amenityAddress: string;
    amenityDescription: string;
    amenityStock: number;
    amenityStockMax: number;
    amenityQuantityMin: number;
    amenityQuantityMax: number;
    amenityReminder: string;
    amenityCreator: string;
    amenityImages: [
        {
            _id: string;
            url: string;
            public_id: string;
        }
    ];
    amenityVisibility: string;
    createdAt: Date;

};