
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
            amenityQuantity: string,
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
    reservationStatus: string,
    reservationVisiblity: string,
    interactedBy: string,
    interactedByPosition: string,
    interactionDate: Date,

}
