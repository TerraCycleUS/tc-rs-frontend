const choseCategory = {
  id: "recyclingBin:TopDescription",
  defaultMessage: "Choose Category",
};

const crfOnly = {
  id: "recyclingBin:crfOnlyDesc",
  defaultMessage: "All brands accepted at Carrefour stores",
};

const bothBrands = {
  id: "recyclingBin:bothBrands",
  defaultMessage: "All brands accepted at Carrefour and Monoprix stores",
};

export default function getCategoryDescription(category) {
  switch (category) {
    case "All":
      return choseCategory;

    case 9:
    case 10:
    case 12:
    case 16:
      return crfOnly;

    case 17:
    case 18:
      return bothBrands;

    default:
      return choseCategory;
  }
}
