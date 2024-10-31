
export type ReservationType = {

    _id: string,
    reserveeId: string,
    reserveeBlkLt: string,
    reserveePosition: string,
    reserveeEmail: string,
    reservationType: string,
    reservationAmenities: [
        {
            amenityId: string,
            amenityName: string,
            amenityType: string,
            amenityAddress: string,
            amenityDescription: string,
            amenityStock: string,
            amenityStockMax: string,
            amenityQuantity: string,
            amenityQuantityMin: string,
            amenityQuantityMax: string,
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
    reservationVisiblity: string,
    interactedBy: string,
    interactedByPosition: string,
    interactionDate: Date,

}
