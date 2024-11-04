
export type ReservationType = {

    _id: string,
    reserveeId: string,
    reserveeBlkLt: string,
    reserveePosition: string,
    reserveeEmail: string,
    reservationType: string,
    reservationAmenities: [
        {
            _id: string,
            amenityName: string,
            amenityType: string,
            amenityAddress: string,
            amenityDescription: string,
            amenityStock: number,
            amenityStockMax: number,
            amenityQuantity: number,
            amenityQuantityMin: number,
            amenityQuantityMax: number,
            amenityReminder: string,
            amenityCreator: string,
            amenityImages: [
                {
                    url?: string,
                    public_id?: string,
                }
            ], 
            amenityVisibility: string,
        }
    ]
    reservationDate: Date,
    reservationReason: string,
    reservationComments: [
        {
            _id: string,
            commentContent: string,
            commentDate: Date,
            commentAuthor: string,
            commentAuthorPosition: string,
        }
    ],
    reservationImages: [
        {
            url?: string,
            public_id?: string,
        }
    ],
    reservationStatus: [
        {
            status: string,
            statusDate: Date,
            statusAuthorId: string,
            statusAuthor: string,
            statusAuthorPosition: string,
        }
    ],
    reservationVisibility: string,
    interactedBy: string,
    interactedByPosition: string,
    interactionDate: Date,
    createdAt: Date,

}
