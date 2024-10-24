
export type ReservationType = {

    _id: string,
    reserveeId: string,
    reserveeBlkLt: string,
    reserveePosition: string,
    reserveeEmail: string,
    amenityId: string,
    amenityName: string,
    amenityType: string,
    amenityAddress: string,
    amenityQuantity: string,
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
    reservationStatus: string,
    reservationVisiblity: string,
    interactedBy: string,
    interactedByPosition: string,
    interactionDate: Date,

}
