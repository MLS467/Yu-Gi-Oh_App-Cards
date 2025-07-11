export class FavoriteCardModel {
  idUser: string;
  idCard: string;
  cardName: string;
  cardImage: string;
  notes: string;

  constructor(
    idUser: string,
    idCard: string,
    cardName: string,
    cardImage: string,
    notes: string = ""
  ) {
    this.idUser = idUser;
    this.idCard = idCard;
    this.cardName = cardName;
    this.cardImage = cardImage;
    this.notes = notes;
  }
}
