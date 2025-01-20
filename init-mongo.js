db = db.getSiblingDB('test');

db.createCollection('users');

db.users.insertOne({
    _id: ObjectId("678e227f2f722cfd96a032a8"),
    email: "test@example.com",
    password: "$2b$08$YD7HYNGxArv2qCkNABeuyOMvA4z7FN9M/eUFXJQzdmslHzgh/HA4e",
    firstName: "Jean",
    lastName: "Dupont",
    about: "Je suis un formateur passionné avec 5 ans d'expérience dans le domaine du développement web.",
    experience: "5 ans d'expérience en développement web, spécialisé en JavaScript et React.",
    phoneNumber: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris, France",
    userType: "formateur",
    profilePicture: "https://example.com/profile-pictures/jean-dupont.jpg",
    availability: [
      ISODate("2023-06-01T09:00:00.000Z"),
      ISODate("2023-06-02T14:00:00.000Z"),
      ISODate("2023-06-03T10:00:00.000Z")
    ],
    hourlyRate: 50,
    teachingLocations: [
      "distance",
      "chez_formateur"
    ],
    iban: "FR7630001007941234567890185",
    reviews: [],
    averageRating: 0,
    createdAt: ISODate("2023-05-15T12:00:00.000Z"),
    updatedAt: ISODate("2023-05-15T12:00:00.000Z")
});